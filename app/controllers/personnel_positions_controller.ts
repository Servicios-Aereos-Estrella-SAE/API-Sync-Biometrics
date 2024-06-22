import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import PersonnelPositionService from '#services/personnel_position_service'

export default class PersonnelPositionsController {
  /**
   * @swagger
   * /api/v1/positions:
   *   get:
   *     tags:
   *       - Positions
   *     summary: List all positions with pagination and optional filters
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
   *       - name: positionCode
   *         in: query
   *         required: false
   *         description: The position code to filter by
   *         schema:
   *           type: string
   *       - name: positionName
   *         in: query
   *         required: false
   *         description: The position name to filter by
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Returns a list of positions
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 meta:
   *                   type: object
   *                   properties:
   *                     total:
   *                       type: integer
   *                     per_page:
   *                       type: integer
   *                     current_page:
   *                       type: integer
   *                     last_page:
   *                       type: integer
   *                 data:
   *                   type: array
   *                   items:
   *                      $ref: '#/components/schemas/PersonnelPosition'
   */

  /**
   * Controller method to handle fetching and listing positions.
   *
   * @param {HttpContext} context - The HTTP context object containing the request.
   * @param {PersonnelPositionService} personnel_position_service - The service class for personnel position operations.
   *
   * @returns {Promise<Response>} - The JSON response containing the list of positions.
   */
  @inject()
  async index({ request }: HttpContext, personnel_position_service: PersonnelPositionService) {
    // Extract pagination parameters from the request, with defaults
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    // Extract filtering parameters from the request
    const filters = {
      positionCode: request.input('positionCode'),
      positionName: request.input('positionName'),
    }
    // Fetch the list of positions using the service class, applying pagination and filters
    return await personnel_position_service.listPositions(page, limit, filters)
  }
}
