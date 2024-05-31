import PersonnelEmployee from '#models/personnel_employee'
import { DateTime } from 'luxon'

export default class PersonnelEmployeeService {
  async listEmployees(page: number = 1, limit: number = 10, filters: any = {}) {
    const query = PersonnelEmployee.query()

    if (filters.empCode) {
      query.where('emp_code', filters.empCode)
    }

    if (filters.firstName) {
      query.where('first_name', 'LIKE', `%${filters.firstName}%`)
    }

    if (filters.lastName) {
      query.where('last_name', 'LIKE', `%${filters.lastName}%`)
    }

    if (filters.depName) {
      query.whereHas('personnelDepartment', (depQuery) => {
        depQuery.where('dept_name', 'LIKE', `%${filters.depName}%`)
      })
    }

    if (filters.positionName) {
      query.whereHas('personnelPosition', (posQuery) => {
        posQuery.where('position_name', 'LIKE', `%${filters.positionName}%`)
      })
    }

    // add filter by deptCode
    if (filters.depCode) {
      query.whereHas('personnelDepartment', (depQuery) => {
        depQuery.where('dept_code', filters.depCode)
      })
    }

    if (filters.positionCode) {
      query.whereHas('personnelPosition', (posQuery) => {
        posQuery.where('position_code', 'LIKE', `%${filters.positionCode}%`)
      })
    }

    if (filters.punchTime) {
      const startDate = DateTime.fromISO(filters.punchTime).startOf('day').toSQL() ?? ''
      const endDate = DateTime.fromISO(filters.punchTime).endOf('day').toSQL() ?? ''
      query.whereHas('transactions', (transactionQuery) => {
        transactionQuery.whereBetween('punch_time', [startDate, endDate])
      })
    }

    return await query
      .preload('personnelDepartment')
      .preload('personnelPosition')
      .paginate(page, limit)
  }
}
