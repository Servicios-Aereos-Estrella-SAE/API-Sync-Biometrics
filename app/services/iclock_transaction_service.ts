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

  async getTransactionsToAsync(page: number = 1, limit: number = 200, filters: any = {}) {
    try {
      // set from env env.get('HOURS_DIFF') to integer
      const hoursDiff = Number(env.get('HOURS_DIFF')) || 0
      const hoursLocal = Number(env.get('HOURS_LOCAL')) || 0
      // Query to get total count
      let countQuery = `
        SELECT
          COUNT(*) AS total
        FROM
          iclock_transaction ict
        INNER JOIN (
          SELECT
            emp_id,
            DATE(punch_time AT TIME ZONE 'UTC-6') AS punch_date
          FROM
            iclock_transaction
          GROUP BY
            emp_id,
            punch_date
        ) sub
        ON
          ict.emp_id = sub.emp_id
          AND DATE(ict.punch_time AT TIME ZONE 'UTC-6') = (sub.punch_date)
      `

      const stringDateVal = `${filters.assistDate}`.split('T')[0]
      const stringDate = `${stringDateVal}T00:00:00.000-06:00`
      const time = DateTime.fromISO(stringDate, { setZone: true })
      const timeCST = time.setZone('UTC-6')
      const filterInitialDate = timeCST.toFormat('yyyy-LL-dd HH:mm:ss')

      // Query to get total count
      let countParams = {
        empId: filters.empId,
        assistDate: filterInitialDate.toString(),
        endAssistsDate: new Date(filters.endAssistsDate),
        hoursDiff,
        hoursLocal,
      }

      if (countParams.assistDate) {
        countQuery += ` WHERE ict.punch_time AT TIME ZONE 'UTC-6' >= DATE('${stringDateVal}T00:00:00.000-06:00' AT TIME ZONE 'UTC-6')`
      }

      if (countParams.empId) {
        countQuery += ` AND ict.emp_id = :empId`
      }
      const totalResult = await db.rawQuery(countQuery, countParams)
      const totalItems = totalResult.rows[0].total

      // Query to get paginated data
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
        ict.punch_time AS punch_time,
        ict.punch_time AS punch_time_local,
        ict.punch_time AS punch_time_origin
      FROM
        iclock_transaction ict
      INNER JOIN (
        SELECT
          emp_id,
          DATE(punch_time AT TIME ZONE 'UTC-6') AS punch_date
        FROM
          iclock_transaction
        GROUP BY
          emp_id,
          punch_date
      ) sub
      ON
        ict.emp_id = sub.emp_id
        AND DATE(ict.punch_time AT TIME ZONE 'UTC-6') = (sub.punch_date)
    `

      // Aplicando filtros a la consulta de datos
      let dataParams = {
        pageSize: limit,
        offset: (page - 1) * limit,
        empId: filters.empId,
        assistDate: filterInitialDate.toString(),
        endAssistsDate: filters.endAssistsDate,
        hoursDiff,
        hoursLocal,
      }

      if (dataParams.assistDate) {
        dataQuery += ` WHERE ict.punch_time AT TIME ZONE 'UTC-6' >= DATE('${stringDateVal}T00:00:00.000-06:00' AT TIME ZONE 'UTC-6')`
      }

      if (dataParams.empId) {
        dataQuery += ` AND ict.emp_id = :empId`
      }

      // Calculate the offset for pagination
      const offset = (page - 1) * limit

      // Add pagination to the data query
      dataQuery += ` ORDER BY ict.punch_time ASC LIMIT :pageSize OFFSET :offset`
      dataParams.pageSize = limit
      dataParams.offset = offset

      const paginatedResults = await db.rawQuery(dataQuery, dataParams)
      // Return the results with pagination information
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

  /**
   * Fetches and lists transactions with pagination, filter range date and by employee filtering.
   *
   * @param {number} page - The page number for pagination (default is 1).
   * @param {number} limit - The number of items per page (default is 10).
   * @param {object} filters - An object containing optional filtering criteria.
   * @param {string} [filters.empId] - The employee ID to filter by.
   * @param {string} [filters.assistStartDate] - The punch date to filter by.
  * @param {string} [filters.assistEndDate] - The punch date to filter by.
   *
   * @returns {Promise<Object>} - A paginated list of transactions.
   *
   * @throws {Error} - Throws an error if there is an issue with the query execution.
   */

  async getTransactionsByEmployeeAsync(page: number = 1, limit: number = 200, filters: any = {}) {
    try {
      // set from env env.get('HOURS_DIFF') to integer
      const hoursDiff = Number(env.get('HOURS_DIFF')) || 0
      const hoursLocal = Number(env.get('HOURS_LOCAL')) || 0
      // Query to get total count
      let countQuery = `
        SELECT
          COUNT(*) AS total
        FROM
          iclock_transaction ict
        INNER JOIN (
          SELECT
            emp_id,
            DATE(punch_time AT TIME ZONE 'UTC-6') AS punch_date
          FROM
            iclock_transaction
          GROUP BY
            emp_id,
            punch_date
        ) sub
        ON
          ict.emp_id = sub.emp_id
          AND DATE(ict.punch_time AT TIME ZONE 'UTC-6') = (sub.punch_date)
      `

      const stringDateStartVal = `${filters.assistStartDate}`.split('T')[0]
      const stringStartDate = `${stringDateStartVal}T00:00:00.000-06:00`
      const timeStart = DateTime.fromISO(stringStartDate, { setZone: true })
      const timeStartCST = timeStart.setZone('UTC-6')
      const filterInitialStartDate = timeStartCST.toFormat('yyyy-LL-dd HH:mm:ss')

      const stringDateEndVal = `${filters.assistEndDate}`.split('T')[0]
      const stringEndDate = `${stringDateEndVal}T00:00:00.000-06:00`
      const timeEnd = DateTime.fromISO(stringEndDate, { setZone: true })
      const timeEndCST = timeEnd.setZone('UTC-6')
      const filterInitialEndDate = timeEndCST.toFormat('yyyy-LL-dd HH:mm:ss')


      // Query to get total count
      let countParams = {
        empCode: filters.empCode,
        startAssistDate: filterInitialStartDate.toString(),
        endAssistsDate: filterInitialEndDate.toString(),
        hoursDiff,
        hoursLocal,
      }

      countQuery += ` WHERE ict.punch_time AT TIME ZONE 'UTC-6' <= DATE('${stringDateEndVal}T00:00:00.000-06:00' AT TIME ZONE 'UTC-6') AND ict.punch_time AT TIME ZONE 'UTC-6' >= DATE('${stringDateStartVal}T00:00:00.000-06:00' AT TIME ZONE 'UTC-6')`

      if (countParams.empCode) {
        countQuery += ` AND ict.emp_code = :empCode`
      }
      const totalResult = await db.rawQuery(countQuery, countParams)
      const totalItems = totalResult.rows[0].total

      // Query to get paginated data
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
        ict.punch_time AS punch_time,
        ict.punch_time AS punch_time_local,
        ict.punch_time AS punch_time_origin
      FROM
        iclock_transaction ict
      INNER JOIN (
        SELECT
          emp_id,
          DATE(punch_time AT TIME ZONE 'UTC-6') AS punch_date
        FROM
          iclock_transaction
        GROUP BY
          emp_id,
          punch_date
      ) sub
      ON
        ict.emp_id = sub.emp_id
        AND DATE(ict.punch_time AT TIME ZONE 'UTC-6') = (sub.punch_date)
    `

      // Aplicando filtros a la consulta de datos
      let dataParams = {
        pageSize: limit,
        offset: (page - 1) * limit,
        empCode: filters.empCode,
        startAssistDate: filterInitialStartDate.toString(),
        endAssistsDate: filterInitialEndDate.toString(),
        hoursDiff,
        hoursLocal,
      }

      dataQuery += ` WHERE ict.punch_time AT TIME ZONE 'UTC-6' <= DATE('${stringDateEndVal}T00:00:00.000-06:00' AT TIME ZONE 'UTC-6') AND ict.punch_time AT TIME ZONE 'UTC-6' >= DATE('${stringDateStartVal}T00:00:00.000-06:00' AT TIME ZONE 'UTC-6')`

      dataQuery += ` AND ict.emp_code = :empCode`

      // Calculate the offset for pagination
      const offset = (page - 1) * limit

      // Add pagination to the data query
      dataQuery += ` ORDER BY ict.punch_time ASC LIMIT :pageSize OFFSET :offset`
      dataParams.pageSize = limit
      dataParams.offset = offset

      const paginatedResults = await db.rawQuery(dataQuery, dataParams)
      // Return the results with pagination information
      const response = {
        pagination: {
          totalItems,
          page,
          pageSize: limit,
          totalPages: Math.ceil(totalItems / limit),
          DateStartParam: filters.assistStartDate,
          DateEndParam: filters.assistEndDate,
          empCode: filters.empCode,
        },
        data: paginatedResults.rows,
      }
      return response
    } catch (error) {
      throw new Error(error)
    }
  }
}
