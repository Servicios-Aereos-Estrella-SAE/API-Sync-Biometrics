import IClockTransaction from '#models/iclock_transaction'

export default class IClockTransactionService {
  async getAllTransactions() {
    try {
      const transactions = await IClockTransaction.query().preload('employee').limit(100)
      return transactions
    } catch (error) {
      throw new Error(error)
    }
  }
}
