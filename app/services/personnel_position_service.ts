import PersonnelPosition from '#models/personnel_position'
/**
 * Service class for handling operations related to Personnel Positions.
 */
export default class PersonnelPositionService {
  /**
   * Fetches and lists positions with pagination and optional filtering.
   *
   * @param {number} page - The page number for pagination (default is 1).
   * @param {number} limit - The number of items per page (default is 10).
   * @param {object} filters - An object containing optional filtering criteria.
   * @param {string} [filters.positionCode] - The position code to filter by.
   * @param {string} [filters.positionName] - The position name to filter by.
   *
   * @returns {Promise<Object>} - A paginated list of positions.
   *
   * @throws {Error} - Throws an error if there is an issue with the query execution.
   */
  async listPositions(page: number = 1, limit: number = 10, filters: any = {}) {
    // Initialize the query for the PersonnelPosition model
    const query = PersonnelPosition.query().orderBy('id', 'desc')
    // Apply position code filter if provided
    if (filters.positionCode) {
      query.where('position_code', filters.positionCode)
    }
    // Apply position name filter if provided

    if (filters.positionName) {
      query.whereLike('position_name', `%${filters.positionName}%`)
    }
    // Execute the query with pagination and preload related subPositions
    return await query.paginate(page, limit)
  }
}
