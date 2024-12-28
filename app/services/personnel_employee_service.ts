import PersonnelEmployee from '#models/personnel_employee'
import { DateTime } from 'luxon'
/**
 * Service class for handling operations related to Personnel Employees.
 */
export default class PersonnelEmployeeService {
  /**
   * Fetches and lists employees with pagination and optional filtering.
   *
   * @param {number} page - The page number for pagination (default is 1).
   * @param {number} limit - The number of items per page (default is 10).
   * @param {object} filters - An object containing optional filtering criteria.
   * @param {string} [filters.empCode] - The employee code to filter by.
   * @param {string} [filters.firstName] - The first name to filter by.
   * @param {string} [filters.lastName] - The last name to filter by.
   * @param {string} [filters.depName] - The department name to filter by.
   * @param {string} [filters.positionName] - The position name to filter by.
   * @param {string} [filters.depCode] - The department code to filter by.
   * @param {string} [filters.positionCode] - The position code to filter by.
   * @param {string} [filters.positionId] - The position ID to filter by.
   * @param {string} [filters.departmentId] - The department ID to filter by.
   * @param {string} [filters.hireDate] - The hire date to filter by.
   *
   * @returns {Promise<Object>} - A paginated list of employees.
   *
   * @throws {Error} - Throws an error if there is an issue with the query execution.
   */
  async listEmployees(page: number = 1, limit: number = 10, filters: any = {}) {
    // Initialize the query for the PersonnelEmployee model
    const query = PersonnelEmployee.query().orderBy('id', 'desc')
    // Apply employee code filter if provided
    if (filters.empCode) {
      query.where('emp_code', filters.empCode)
    }
    // Apply first name filter if provided
    if (filters.firstName) {
      query.whereLike('first_name', `%${filters.firstName}%`)
    }
    // Apply last name filter if provided
    if (filters.lastName) {
      query.whereLike('last_name', `%${filters.lastName}%`)
    }
    // Apply department name filter if provided
    if (filters.depName) {
      query.whereHas('personnelDepartment', (depQuery) => {
        depQuery.whereLike('dept_name', `%${filters.depName}%`)
      })
    }
    // Apply position name filter if provided
    if (filters.positionName) {
      query.whereHas('personnelPosition', (posQuery) => {
        posQuery.whereLike('position_name', `%${filters.positionName}%`)
      })
    }

    // Apply department code filter if provided
    if (filters.depCode) {
      query.whereHas('personnelDepartment', (depQuery) => {
        depQuery.where('dept_code', filters.depCode)
      })
    }
    // Apply position code filter if provided
    if (filters.positionCode) {
      query.whereHas('personnelPosition', (posQuery) => {
        posQuery.whereLike('position_code', `%${filters.positionCode}%`)
      })
    }
    // Apply position ID filter if provided
    if (filters.positionId) {
      query.where('position_id', filters.positionId)
    }
    // Apply department ID filter if provided
    if (filters.departmentId) {
      query.where('department_id', filters.departmentId)
    }
    // Apply hire date filter if provided
    if (filters.hireDate) {
      const startDate = DateTime.fromISO(filters.hireDate).startOf('day').toSQL() ?? ''
      const endDate = DateTime.fromISO(filters.hireDate).endOf('day').toSQL() ?? ''
      query.whereBetween('hire_date', [startDate, endDate])
    }
    // Execute the query with pagination and preload related models
    return await query
      .preload('personnelDepartment')
      .preload('personnelPosition')
      .preload('personnelEmployeeArea', (areaQuery) => {
        areaQuery.preload('personnelArea')
      })
      .paginate(page, limit)
  }
}
