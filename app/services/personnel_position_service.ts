import PersonnelPosition from '#models/personnel_position'

export default class PersonnelPositionService {
  async listPositions(page: number = 1, limit: number = 10, filters: any = {}) {
    const query = PersonnelPosition.query()

    if (filters.positionCode) {
      query.where('position_code', filters.positionCode)
    }

    if (filters.positionName) {
      query.where('position_name', 'LIKE', `%${filters.positionName}%`)
    }

    return await query.paginate(page, limit)
  }
}
