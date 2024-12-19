import { BaseModel, column } from '@adonisjs/lucid/orm'
/**
 * @swagger
 * components:
 *   schemas:
 *     PersonnelArea:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *        areaCode:
 *          type: string
 *        areaName:
 *          type: string
 *        isDefault:
 *          type: number
 *        companyId:
 *          type: number
 *        parentAreaId:
 *          type: number
 */
export default class PersonnelArea extends BaseModel {
  static table = 'personnel_area'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare areaCode: string

  @column()
  declare areaName: string

  @column()
  declare isDefault: number

  @column()
  declare companyId: number

  @column()
  declare parentAreaId: number
}
