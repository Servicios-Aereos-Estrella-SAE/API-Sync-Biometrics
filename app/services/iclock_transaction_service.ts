import IClockTransaction from '#models/iclock_transaction'
import { DateTime } from 'luxon'
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
}
