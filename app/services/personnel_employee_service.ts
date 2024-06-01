import PersonnelEmployee from '#models/personnel_employee'
import { DateTime } from 'luxon'

export default class PersonnelEmployeeService {
  async listEmployees(page: number = 1, limit: number = 10, filters: any = {}) {
    const query = PersonnelEmployee.query().orderBy('id', 'desc')

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

    if (filters.positionId) {
      query.where('position_id', filters.positionId)
    }

    if (filters.departmentId) {
      query.where('department_id', filters.departmentId)
    }

    if (filters.hireDate) {
      const startDate = DateTime.fromISO(filters.hireDate).startOf('day').toSQL() ?? ''
      const endDate = DateTime.fromISO(filters.hireDate).endOf('day').toSQL() ?? ''
      query.whereBetween('hire_date', [startDate, endDate])
    }

    return await query
      .preload('personnelDepartment')
      .preload('personnelPosition')
      .paginate(page, limit)
  }
}
