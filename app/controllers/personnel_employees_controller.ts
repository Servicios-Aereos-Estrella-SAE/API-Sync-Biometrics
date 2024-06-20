import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/fold'
import PersonnelEmployeeService from '#services/personnel_employee_service'

export default class PersonnelEmployeesController {
  /**
   * @swagger
   * /api/v1/employees:
   *   get:
   *     tags:
   *       - Employees
   *     summary: List all employees with pagination and optional filters
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
   *         required: false
   *         description: The employee code to filter by
   *         schema:
   *           type: string
   *       - name: firstName
   *         in: query
   *         required: false
   *         description: The first name to filter by
   *         schema:
   *           type: string
   *       - name: lastName
   *         in: query
   *         required: false
   *         description: The last name to filter by
   *         schema:
   *           type: string
   *       - name: depName
   *         in: query
   *         required: false
   *         description: The department name to filter by
   *         schema:
   *           type: string
   *       - name: positionName
   *         in: query
   *         required: false
   *         description: The position name to filter by
   *         schema:
   *           type: string
   *       - name: depCode
   *         in: query
   *         required: false
   *         description: The department code to filter by
   *         schema:
   *           type: string
   *       - name: positionCode
   *         in: query
   *         required: false
   *         description: The position code to filter by
   *         schema:
   *           type: string
   *       - name: departmentId
   *         in: query
   *         required: false
   *         description: The department id to filter by
   *         schema:
   *          type: integer
   *       - name: positionId
   *         in: query
   *         required: false
   *         description: The position id to filter by
   *         schema:
   *          type: integer
   *       - name: hireDate
   *         in: query
   *         required: false
   *         description: The hire date to filter by format year month day
   *         schema:
   *           type: string
   *           format: date
   *     responses:
   *       200:
   *         description: Returns a list of employees
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
   *                     $ref: '#/definitions/PersonnelEmployee'
   */
  /**
   * Controller method to handle fetching and listing employees.
   *
   * @param {HttpContext} context - The HTTP context object containing the request and response.
   * @param {PersonnelEmployeeService} personnel_employee_service - The service class for personnel employee operations.
   *
   * @returns {Promise<Response>} - The JSON response containing the list of employees.
   */
  @inject()
  async index(
    { request, response }: HttpContext,
    personnel_employee_service: PersonnelEmployeeService
  ) {
    // Extract pagination parameters from the request, with defaults
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    // Extract filtering parameters from the request
    const filters = {
      empCode: request.input('empCode'),
      firstName: request.input('firstName'),
      lastName: request.input('lastName'),
      depName: request.input('depName'),
      positionName: request.input('positionName'),
      depCode: request.input('depCode'),
      positionId: request.input('positionId'),
      departmentId: request.input('departmentId'),
      positionCode: request.input('positionCode'),
      punchTime: request.input('punchTime'),
      hireDate: request.input('hireDate'),
    }

    // Fetch the list of employees using the service class, applying pagination and filters
    const employees = await personnel_employee_service.listEmployees(page, limit, filters)
    // Return the fetched list as a JSON response
    return response.json(employees)
  }
}
