import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
/**
 * @swagger
 * definitions:
 *   PersonnelPosition:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       positionCode:
 *         type: string
 *       positionName:
 *         type: string
 *       isDefault:
 *         type: boolean
 *       companyId:
 *         type: integer
 *       parentPositionId:
 *         type: integer
 *       parentPosition:
 *         $ref: '#/definitions/PersonnelPosition'
 *       subPositions:
 *         type: array
 *         items:
 *           $ref: '#/definitions/PersonnelPosition'
 */
export default class PersonnelPosition extends BaseModel {
  static table = 'personnel_position'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare positionCode: string

  @column()
  declare positionName: string

  @column()
  declare isDefault: boolean

  @column()
  declare companyId: number

  @column()
  declare parentPositionId: number

  @belongsTo(() => PersonnelPosition, {
    foreignKey: 'parentPositionId',
  })
  declare parentPosition: BelongsTo<typeof PersonnelPosition>

  @hasMany(() => PersonnelPosition, {
    foreignKey: 'parentPositionId',
  })
  declare subPositions: HasMany<typeof PersonnelPosition>
}
