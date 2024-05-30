import IClockTransaction from '#models/iclock_transaction'

export default class IClockTransactionService {
  async getAllTransactions(page: number = 1, limit: number = 10) {
    try {
      const transactions = await IClockTransaction.query().preload('employee').paginate(page, limit)
      return transactions
    } catch (error) {
      throw new Error(error)
    }
  }
}
