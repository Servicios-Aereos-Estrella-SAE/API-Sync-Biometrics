import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import PersonnelArea from './personnel_area.js'
/**
 * @swagger
 * components:
 *   schemas:
 *     PersonnelEmployeeArea:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *        employeeId:
 *          type: number
 *        areaId:
 *          type: number
 */
export default class PersonnelEmployeeArea extends BaseModel {
  static table = 'personnel_employee_area'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare employeeId: number

  @column()
  declare areaId: number

  @belongsTo(() => PersonnelArea, {
    foreignKey: 'areaId',
  })
  declare personnelArea: BelongsTo<typeof PersonnelArea>
}
