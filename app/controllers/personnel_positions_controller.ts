import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import PersonnelPositionService from '#services/personnel_position_service'

export default class PersonnelPositionsController {
  /**
   * @swagger
   * /positions:
   *   get:
   *     tags:
   *       - PersonnelPositions
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
   *                     type: object
   *                     properties:
   *                       id:
   *                         type: integer
   *                       positionCode:
   *                         type: string
   *                       positionName:
   *                         type: string
   *                       isDefault:
   *                         type: boolean
   */
  @inject()
  async index({ request }: HttpContext, personnel_position_service: PersonnelPositionService) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const filters = {
      positionCode: request.input('positionCode'),
      positionName: request.input('positionName'),
    }

    return await personnel_position_service.listPositions(page, limit, filters)
  }
}
