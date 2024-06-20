import PersonnelDepartment from '#models/personnel_department'
/**
 * Service class for handling operations related to Personnel Departments.
 */
export default class PersonnelDepartmentService {
  /**
   * Fetches and lists departments with pagination and optional filtering.
   *
   * @param {number} page - The page number for pagination (default is 1).
   * @param {number} limit - The number of items per page (default is 10).
   * @param {object} filters - An object containing optional filtering criteria.
   * @param {string} [filters.depCode] - The department code to filter by.
   * @param {string} [filters.depName] - The department name to filter by.
   *
   * @returns {Promise<Object>} - A paginated list of departments.
   */
  async listDepartments(page: number = 1, limit: number = 10, filters: any = {}) {
    // Initialize the query for the PersonnelDepartment model
    const query = PersonnelDepartment.query()
      .preload('parentDepartment')
      .preload('subDepartments')
      .orderBy('id', 'desc')
    // Apply department code filter if provided
    if (filters.depCode) {
      query.where('dept_code', filters.depCode)
    }

    // Apply department name filter if provided
    if (filters.depName) {
      query.whereLike('dept_name', `%${filters.depName}%`)
    }
    // Execute the query with pagination and return the results
    return await query.paginate(page, limit)
  }
}
