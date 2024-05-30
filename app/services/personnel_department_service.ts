import PersonnelDepartment from '#models/personnel_department'

export default class PersonnelDepartmentService {
  async listDepartments(page: number = 1, limit: number = 10, filters: any = {}) {
    const query = PersonnelDepartment.query().preload('parentDepartment').preload('subDepartments')

    if (filters.deptCode) {
      query.where('dept_code', filters.deptCode)
    }

    if (filters.deptName) {
      query.where('dept_name', 'LIKE', `%${filters.deptName}%`)
    }
    return await query.paginate(page, limit)
  }
}
