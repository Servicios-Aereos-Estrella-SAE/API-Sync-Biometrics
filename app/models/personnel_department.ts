import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
/**
 * @swagger
 * definitions:
 *   PersonnelDepartment:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       deptCode:
 *         type: string
 *       deptName:
 *         type: string
 *       isDefault:
 *         type: boolean
 *       companyId:
 *         type: integer
 *       parentDeptId:
 *         type: integer
 *       parentDepartment:
 *         $ref: '#/definitions/PersonnelDepartment'
 *       subDepartments:
 *         type: array
 *         items:
 *           $ref: '#/definitions/PersonnelDepartment'
 */

export default class PersonnelDepartment extends BaseModel {
  static table = 'personnel_department'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare deptCode: string

  @column()
  declare deptName: string

  @column()
  declare isDefault: boolean

  @column()
  declare companyId: number

  @column()
  declare parentDeptId: number

  @belongsTo(() => PersonnelDepartment, {
    foreignKey: 'parentDeptId',
  })
  declare parentDepartment: BelongsTo<typeof PersonnelDepartment>

  @hasMany(() => PersonnelDepartment, {
    foreignKey: 'parentDeptId',
  })
  declare subDepartments: HasMany<typeof PersonnelDepartment>
}
