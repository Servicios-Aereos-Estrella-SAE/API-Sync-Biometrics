import IClockTransaction from '#models/iclock_transaction'
import { DateTime } from 'luxon'

export default class IClockTransactionService {
  async getAllTransactions(page: number = 1, limit: number = 10, filters: any = {}) {
    try {
      const query = IClockTransaction.query().preload('employee').orderBy('punch_time', 'desc')

      if (filters.empId) {
        query.where('emp_id', filters.empId)
      }

      if (filters.positionId) {
        query.whereHas('employee', (empQuery) => {
          empQuery.where('position_id', filters.positionId)
        })
      }

      if (filters.departmentId) {
        query.whereHas('employee', (empQuery) => {
          empQuery.where('department_id', filters.departmentId)
        })
      }

      if (filters.punchDate) {
        const startDate = DateTime.fromISO(filters.punchDate).startOf('day').toSQL() ?? ''
        const endDate = DateTime.fromISO(filters.punchDate).endOf('day').toSQL() ?? ''
        query.whereBetween('punch_time', [startDate, endDate])
      }

      return await query.paginate(page, limit)
    } catch (error) {
      throw new Error(error)
    }
  }
}
