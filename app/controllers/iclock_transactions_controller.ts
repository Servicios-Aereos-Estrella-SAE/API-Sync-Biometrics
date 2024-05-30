// import type { HttpContext } from '@adonisjs/core/http'
import IClockTransactionService from '#services/iclock_transaction_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

export default class IClockTransactionsController {
  /**
   * @swagger
   * /iclock-transactions:
   *   get:
   *     tags:
   *       - IclockTransactions
   *     summary: Get all iclock transactions
   *     parameters:
   *       - name: page
   *         in: query
   *         required: false
   *         description: The page number for pagination
   *         schema:
   *           type: integer
   *       - name: limit
   *         in: query
   *         required: false
   *         description: The number of records per page
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Returns all iclock transactions
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: integer
   *                   empCode:
   *                     type: string
   *                   punchTime:
   *                     type: string
   *                     format: date-time
   *                   punchState:
   *                     type: string
   *                   verifyType:
   *                     type: integer
   *                   workCode:
   *                     type: string
   *                   terminalSn:
   *                     type: string
   *                   terminalAlias:
   *                     type: string
   *                   areaAlias:
   *                     type: string
   *                   longitude:
   *                     type: number
   *                   latitude:
   *                     type: number
   *                   gpsLocation:
   *                     type: string
   *                   mobile:
   *                     type: string
   *                   source:
   *                     type: integer
   *                   purpose:
   *                     type: integer
   *                   crc:
   *                     type: string
   *                   isAttendance:
   *                     type: integer
   *                   reserved:
   *                     type: string
   *                   uploadTime:
   *                     type: string
   *                     format: date-time
   *                   syncStatus:
   *                     type: integer
   *                   syncTime:
   *                     type: string
   *                     format: date-time
   *                   empId:
   *                     type: integer
   *                   terminalId:
   *                     type: integer
   *                   isMask:
   *                     type: integer
   *                   temperature:
   *                     type: number
   */
  @inject()
  index({ request }: HttpContext, i_clock_terminal_services: IClockTransactionService) {
    // return i_clock_terminal_services.getAllTransactions()
    // return response all transactions json
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    return i_clock_terminal_services.getAllTransactions(page, limit)
  }
}
