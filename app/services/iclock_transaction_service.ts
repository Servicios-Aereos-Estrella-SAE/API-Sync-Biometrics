/* eslint-disable prettier/prettier */
import IClockTransaction from '#models/iclock_transaction'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'
import env from '#start/env'

/**
 * Service class for handling operations related to iClock Transactions.
 */
export default class IClockTransactionService {
  /**
   * Fetches and lists transactions with pagination and optional filtering.
   *
   * @param {number} page - The page number for pagination (default is 1).
   * @param {number} limit - The number of items per page (default is 10).
   * @param {object} filters - An object containing optional filtering criteria.
   * @param {string} [filters.empId] - The employee ID to filter by.
   * @param {string} [filters.positionId] - The position ID to filter by.
   * @param {string} [filters.departmentId] - The department ID to filter by.
   * @param {string} [filters.punchDate] - The punch date to filter by.
   *
   * @returns {Promise<Object>} - A paginated list of transactions.
   *
   * @throws {Error} - Throws an error if there is an issue with the query execution.
   */
  async getAllTransactions(page: number = 1, limit: number = 10, filters: any = {}) {
    try {
      // Initialize the query for the IClockTransaction model
      const query = IClockTransaction.query().preload('employee').orderBy('punch_time', 'desc')
      // Apply employee ID filter if provided

      if (filters.empId) {
        query.where('emp_id', filters.empId)
      }

      // Apply position ID filter if provided
      if (filters.positionId) {
        query.whereHas('employee', (empQuery) => {
          empQuery.where('position_id', filters.positionId)
        })
      }

      // Apply department ID filter if provided
      if (filters.departmentId) {
        query.whereHas('employee', (empQuery) => {
          empQuery.where('department_id', filters.departmentId)
        })
      }

      // Apply punch date filter if provided
      if (filters.punchDate) {
        const startDate = DateTime.fromISO(filters.punchDate).startOf('day').toSQL() ?? ''
        const endDate = DateTime.fromISO(filters.punchDate).endOf('day').toSQL() ?? ''
        query.whereBetween('punch_time', [startDate, endDate])
      }
      // Execute the query with pagination and return the results
      return await query.paginate(page, limit)
    } catch (error) {
      throw new Error(error)
    }
  }

  /**
   * Fetches and lists transactions with pagination and optional filtering.
   *
   * @param {number} page - The page number for pagination (default is 1).
   * @param {number} limit - The number of items per page (default is 10).
   * @param {object} filters - An object containing optional filtering criteria.
   * @param {string} [filters.empId] - The employee ID to filter by.
   * @param {string} [filters.assistDate] - The punch date to filter by.
   *
   * @returns {Promise<Object>} - A paginated list of transactions.
   *
   * @throws {Error} - Throws an error if there is an issue with the query execution.
   */
  async getTransactionsToAsync2(page: number = 1, limit: number = 10, filters: any = {}) {
    try {
      // Initialize the query for the IClockTransaction model
      const query = db
        .from('iclock_transaction')
        .select(
          'id',
          'emp_code',
          'terminal_sn',
          'terminal_alias',
          'area_alias',
          'longitude',
          'latitude',
          'upload_time',
          'emp_id',
          'terminal_id',
          db.raw(`(punch_time - interval '13 hours') as punch_time_local`)
        )
        .orderBy('punch_time_local', 'asc')
      // // Apply department ID filter if provided
      if (filters.empId) {
        query.where('emp_id', filters.empId)
      }

      if (filters.assistDate) {
        const dateTimeAssist = new Date(filters.assistDate)
        query.where(db.raw(`(punch_time - interval '13 hours')`), '>=', dateTimeAssist)
      }

      if (filters.endAssistsDate) {
        // query.where('punch_time_local', '<=', filters.endAssistsDate)
      }
      // Execute the query with pagination and return the results
      const result = await query.paginate(page, limit)
      // map to convert to utz timezone, first set origin zone GMT+7
      // result.forEach((item) => {
      //   item.punchTime = item.punchTime.minus({ hours: 6 })
      // })
      return result
    } catch (error) {
      throw new Error(error)
    }
  }

  async getTransactionsToAsync(page: number = 1, limit: number = 200, filters: any = {}) {
    try {
      // set from env env.get('HOURS_DIFF') to integer
      const hoursDiff = Number(env.get('HOURS_DIFF')) || 0
      const hoursLocal = Number(env.get('HOURS_LOCAL')) || 0
      // Consulta para obtener el total de registros
      let countQuery = `
        SELECT
          COUNT(*) AS total
        FROM
          iclock_transaction ict
        INNER JOIN (
          SELECT
            emp_id,
            DATE(punch_time - interval '${hoursDiff} hours') AS punch_date,
            MIN(punch_time - interval '${hoursDiff} hours') AS first_punch,
            MAX(punch_time - interval '${hoursDiff} hours') AS last_punch
          FROM
            iclock_transaction
          GROUP BY
            emp_id,
            punch_date
        ) sub
        ON
          ict.emp_id = sub.emp_id
          AND DATE(ict.punch_time - interval '${hoursDiff} hours') = (sub.punch_date)
          AND ((ict.punch_time - interval '${hoursDiff} hours') = sub.first_punch OR (ict.punch_time - interval '${hoursDiff} hours') = sub.last_punch)
      `

      const stringDateVal = `${filters.assistDate}`.split('T')[0]
      // const stringDate = `${stringDateVal}T00:00:00.000-06:00`
      console.info('🚀 -------------------------------------------------------------------------------------🚀')
      console.info('🚀 ~ IClockTransactionService ~ getTransactionsToAsync ~ stringDateVal:', stringDateVal)
      console.info('🚀 -------------------------------------------------------------------------------------🚀')
      // const time = DateTime.fromISO(stringDate, { setZone: true })
      // const timeCST = time.setZone('America/Mexico_City')
      // const filterInitialDate = timeCST.toFormat('yyyy-LL-dd HH:mm:ss')

      // Aplicando filtros a la consulta de conteo
      let countParams = {
        empId: filters.empId,
        assistDate: stringDateVal,
        endAssistsDate: new Date(filters.endAssistsDate),
        hoursDiff,
        hoursLocal,
      }

      if (countParams.assistDate) {
        countQuery += ` WHERE (date(ict.punch_time - interval '${hoursDiff} hours')) >= :assistDate`
      }

      if (filters.endAssistsDate) {
        countQuery += countParams.endAssistsDate
          ? ` AND (date(ict.punch_time - interval '${hoursDiff} hours')) <= :endAssistsDate`
          : ` AND (date(ict.punch_time - interval '${hoursDiff} hours')) <= :endAssistsDate`
      }

      if (countParams.empId) {
        countQuery += ` AND ict.emp_id = :empId`
      }
      const totalResult = await db.rawQuery(countQuery, countParams)
      const totalItems = totalResult.rows[0].total

      // Consulta para obtener los datos paginados
      let dataQuery = `
      SELECT
        ict.id,
        ict.emp_code,
        ict.terminal_sn,
        ict.terminal_alias,
        ict.area_alias,
        ict.longitude,
        ict.latitude,
        ict.upload_time,
        ict.emp_id,
        ict.terminal_id,
        punch_time AS punch_time_origin_real,
        ((ict.punch_time - interval '${hoursDiff} hours')) AS punch_time,
        ((ict.punch_time - interval '${hoursDiff + hoursLocal} hours' )) AS punch_time_local,
        (ict.punch_time - interval '${hoursLocal} hours') AS punch_time_origin
      FROM
        iclock_transaction ict
      INNER JOIN (
        SELECT
          emp_id,
          DATE(punch_time - interval '${hoursDiff} hours') AS punch_date,
          MIN(punch_time - interval '${hoursDiff} hours') AS first_punch,
          MAX(punch_time - interval '${hoursDiff} hours') AS last_punch
        FROM
          iclock_transaction
        GROUP BY
          emp_id,
          punch_date
      ) sub
      ON
        ict.emp_id = sub.emp_id
        AND DATE(ict.punch_time - interval '${hoursDiff} hours') = (sub.punch_date)
        AND (ict.punch_time - interval '${hoursDiff} hours' = sub.first_punch OR ict.punch_time - interval '${hoursDiff} hours' = sub.last_punch)
    `

      // Aplicando filtros a la consulta de datos
      let dataParams = {
        pageSize: limit,
        offset: (page - 1) * limit,
        empId: filters.empId,
        assistDate: stringDateVal,
        endAssistsDate: filters.endAssistsDate,
        hoursDiff,
        hoursLocal,
      }

      if (dataParams.assistDate) {
        dataQuery += ` WHERE (date(ict.punch_time - interval '${hoursDiff} hours')) >= timestamp '2024-06-25' AT TIME ZONE 'UTC'`
      }

      if (dataParams.endAssistsDate) {
        dataQuery += dataParams.assistDate
          ? ` AND (date(ict.punch_time - interval '${hoursDiff} hours')) <= :endAssistsDate`
          : ` AND (date(ict.punch_time - interval '${hoursDiff} hours')) <= :endAssistsDate`
      }

      if (dataParams.empId) {
        dataQuery += ` AND ict.emp_id = :empId`
      }

      // Calcular el offset para la paginación
      const offset = (page - 1) * limit

      // Añadir paginación a la consulta de datos
      dataQuery += ` ORDER BY ict.punch_time ASC LIMIT :pageSize OFFSET :offset`
      dataParams.pageSize = limit
      dataParams.offset = offset

      const paginatedResults = await db.rawQuery(dataQuery, dataParams)
      console.info('🚀 -------------------------------------------------------------------------------🚀')
      console.info('🚀 ~ IClockTransactionService ~ getTransactionsToAsync ~ dataParams:', dataParams)
      console.info('🚀 -------------------------------------------------------------------------------🚀')
      console.info('🚀 -----------------------------------------------------------------------------🚀')
      console.info('🚀 ~ IClockTransactionService ~ getTransactionsToAsync ~ dataQuery:', dataQuery)
      console.info('🚀 -----------------------------------------------------------------------------🚀')
      // Devolver los resultados con información de paginación
      const response = {
        pagination: {
          totalItems,
          page,
          pageSize: limit,
          totalPages: Math.ceil(totalItems / limit),
          DateParam: filters.assistDate,
        },
        data: paginatedResults.rows,
      }
      return response
    } catch (error) {
      throw new Error(error)
    }
  }
}
