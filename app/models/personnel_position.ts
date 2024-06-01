import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'

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
