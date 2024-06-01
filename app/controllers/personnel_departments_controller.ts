// import type { HttpContext } from '@adonisjs/core/http'
import PersonnelDepartmentService from '#services/personnel_department_service'
import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'

export default class PersonnelDepartmentsController {
  /**
   * @swagger
   * /departments:
   *   get:
   *     tags:
   *       - PersonnelDepartments
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
   *       - name: deptCode
   *         in: query
   *         required: false
   *         description: The department code to filter by
   *         schema:
   *           type: string
   *       - name: deptName
   *         in: query
   *         required: false
   *         description: The department name to filter by
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
   *                     type: object
   *                     properties:
   *                       id:
   *                         type: integer
   *                       deptCode:
   *                         type: string
   *                       deptName:
   *                         type: string
   *                       isDefault:
   *                         type: boolean
   *                       companyId:
   *                         type: integer
   *                       parentDeptId:
   *                         type: integer
   */
  @inject()
  async index(
    { request, response }: HttpContext,
    personnel_department_services: PersonnelDepartmentService
  ) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const filters = {
      deptCode: request.input('deptCode'),
      deptName: request.input('deptName'),
    }

    const departments = await personnel_department_services.listDepartments(page, limit, filters)
    return response.json(departments)
  }
}
