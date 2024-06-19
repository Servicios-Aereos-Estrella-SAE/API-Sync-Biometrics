// import type { HttpContext } from '@adonisjs/core/http'
import PersonnelDepartmentService from '#services/personnel_department_service'
import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'

export default class PersonnelDepartmentsController {
  /**
   * @swagger
   * /api/v1/departments:
   *   get:
   *     tags:
   *       - Departments
   *     summary: List all departments with pagination and optional filters
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
   *       - name: depCode
   *         in: query
   *         required: false
   *         description: The departament code to filter by
   *         schema:
   *           type: string
   *       - name: depName
   *         in: query
   *         required: false
   *         description: The departament name to filter by
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Returns a list of departments
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
   *                      $ref: '#/definitions/PersonnelDepartment'
   */
  /**
   * Controller method to handle fetching and listing departments.
   *
   * @param {HttpContext} context - The HTTP context object containing the request and response.
   * @param {PersonnelDepartmentService} personnel_department_services - The service class for personnel department operations.
   *
   * @returns {Promise<Response>} - The JSON response containing the list of departments.
   */
  @inject()
  async index(
    { request, response }: HttpContext,
    personnel_department_services: PersonnelDepartmentService
  ) {
    // Extract pagination parameters from the request, with defaults
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    // Extract filtering parameters from the request
    const filters = {
      depCode: request.input('depCode'),
      depName: request.input('depName'),
    }
    // Fetch the list of departments using the service class, applying pagination and filters
    const departments = await personnel_department_services.listDepartments(page, limit, filters)
    // Return the fetched list as a JSON response
    return response.json(departments)
  }
}
