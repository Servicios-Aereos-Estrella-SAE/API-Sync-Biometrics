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
  index(i_clock_terminal_services: IClockTransactionService) {
    // return i_clock_terminal_services.getAllTransactions()
    // return response all transactions json
    return i_clock_terminal_services.getAllTransactions()
  }
}
