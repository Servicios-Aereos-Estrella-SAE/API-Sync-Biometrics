import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/fold'
import PersonnelEmployeeService from '#services/personnel_employee_service'

export default class PersonnelEmployeesController {
  /**
   * @swagger
   * /employees:
   *   get:
   *     tags:
   *       - PersonnelEmployees
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
   *       - name: punchTime
   *         in: query
   *         required: false
   *         description: The punch time to filter by format year month day
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
   *                     type: object
   *                     properties:
   *                       id:
   *                         type: integer
   *                       empCode:
   *                         type: string
   *                       firstName:
   *                         type: string
   *                       lastName:
   *                         type: string
   *                       departmentId:
   *                         type: integer
   *                       positionId:
   *                         type: integer
   *                       personnelDepartment:
   *                         type: object
   *                       personnelPosition:
   *                         type: object
   *                       transactions:
   *                         type: array
   *                         items:
   *                           type: object
   */
  @inject()
  async index(
    { request, response }: HttpContext,
    personnel_employee_service: PersonnelEmployeeService
  ) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const filters = {
      empCode: request.input('empCode'),
      firstName: request.input('firstName'),
      lastName: request.input('lastName'),
      depName: request.input('depName'),
      positionName: request.input('positionName'),
      depCode: request.input('depCode'),
      positionCode: request.input('positionCode'),
      punchTime: request.input('punchTime'),
    }

    const employees = await personnel_employee_service.listEmployees(page, limit, filters)
    return response.json(employees)
  }
}
