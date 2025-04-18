// import type { HttpContext } from '@adonisjs/core/http'
import IClockTransactionService from '#services/iclock_transaction_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

export default class IClockTransactionsController {
  /**
   * @swagger
   * /api/v1/transactions:
   *   get:
   *     tags:
   *       - Transactions
   *     summary: Get all transactions
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
   *       - name: departmentId
   *         in: query
   *         required: false
   *         description: The department id to filter by
   *         schema:
   *          type: integer
   *       - name: empId
   *         in: query
   *         required: false
   *         description: The employee id to filter by
   *         schema:
   *          type: integer
   *       - name: positionId
   *         in: query
   *         required: false
   *         description: The position id to filter by
   *         schema:
   *          type: integer
   *       - name: punchDate
   *         in: query
   *         required: false
   *         description: The punch date to filter by format year month day
   *         schema:
   *           type: string
   *           format: date
   *     responses:
   *       200:
   *         description: Returns all iclock transactions
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/IClockTransaction'
   */
  /**
   * Controller method to handle fetching and listing transactions.
   *
   * @param {HttpContext} context - The HTTP context object containing the request.
   * @param {IClockTransactionService} i_clock_terminal_services - The service class for iClock transaction operations.
   *
   * @returns {Promise<Response>} - The JSON response containing the list of transactions.
   */
  @inject()
  index({ request }: HttpContext, i_clock_terminal_services: IClockTransactionService) {
    // Extract pagination parameters from the request, with defaults
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    // Extract filtering parameters from the request
    const filters = {
      empId: request.input('empId'),
      departmentId: request.input('departmentId'),
      positionId: request.input('positionId'),
      punchDate: request.input('punchDate'),
      assistDate: request.input('assistDate'),
    }
    // Fetch the list of transactions using the service class, applying pagination and filters
    return i_clock_terminal_services.getAllTransactions(page, limit, filters)
  }

  /**
   * @swagger
   * /api/v1/transactions-async:
   *   get:
   *     tags:
   *       - Transactions
   *     summary: Get all transactions
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
   *       - name: empId
   *         in: query
   *         required: false
   *         description: The employee id to filter by
   *         schema:
   *          type: integer
   *       - name: assistDate
   *         in: query
   *         required: false
   *         description: The assist date to filter by format year month day
   *         schema:
   *           type: string
   *           format: date
   *     responses:
   *       200:
   *         description: Returns all iclock transactions
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/IClockTransaction'
   */
  /**
   * Controller method to handle fetching and listing transactions.
   *
   * @param {HttpContext} context - The HTTP context object containing the request.
   * @param {IClockTransactionService} i_clock_terminal_services - The service class for iClock transaction operations.
   *
   * @returns {Promise<Response>} - The JSON response containing the list of transactions.
   */
  @inject()
  getAsyncAssists({ request }: HttpContext, i_clock_terminal_services: IClockTransactionService) {
    // Extract pagination parameters from the request, with defaults
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    // Extract filtering parameters from the request
    const filters = {
      empId: request.input('empId'),
      assistDate: request.input('assistDate'),
    }
    // Fetch the list of transactions using the service class, applying pagination and filters
    return i_clock_terminal_services.getTransactionsToAsync(page, limit, filters)
  }

  /**
   * @swagger
   * /api/v1/transactions-by-employee-async:
   *   get:
   *     tags:
   *       - Transactions
   *     summary: Get all transactions by employee
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
   *       - name: empCode
   *         in: query
   *         required: true
   *         description: The employee id to filter by
   *         schema:
   *          type: integer
   *       - name: assistStartDate
   *         in: query
   *         required: true
   *         description: The assist date to filter by format year month day
   *         schema:
   *           type: string
   *           format: date
   *       - name: assistEndDate
   *         in: query
   *         required: true
   *         description: The assist date to filter by format year month day
   *         schema:
   *           type: string
   *           format: date
   *     responses:
   *       200:
   *         description: Returns all iclock transactions
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/IClockTransaction'
   */
  /**
   * Controller method to handle fetching and listing transactions.
   *
   * @param {HttpContext} context - The HTTP context object containing the request.
   * @param {IClockTransactionService} i_clock_terminal_services - The service class for iClock transaction operations.
   *
   * @returns {Promise<Response>} - The JSON response containing the list of transactions.
   */
  @inject()
  getAsyncAssistsByEmployee(
    { request, response }: HttpContext,
    i_clock_terminal_services: IClockTransactionService
  ) {
    // Extract pagination parameters from the request, with defaults
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    // Extract filtering parameters from the request
    // valid if hast empId, assistStartDate and assistEndDate
    if (
      !request.input('empCode') ||
      !request.input('assistStartDate') ||
      !request.input('assistEndDate')
    ) {
      return response
        .status(400)
        .json({ message: 'empCode, assistStartDate and assistEndDate are required' })
    }

    const filters = {
      empCode: request.input('empCode'),
      assistStartDate: request.input('assistStartDate'),
      assistEndDate: request.input('assistEndDate'),
    }
    // Fetch the list of transactions using the service class, applying pagination and filters
    return i_clock_terminal_services.getTransactionsByEmployeeAsync(page, limit, filters)
  }
}
