import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import PersonnelEmployee from '#models/personnel_employee'
import IClockTerminal from '#models/iclock_terminal'
import { DateTime } from 'luxon'

/**
 * @swagger
 * components:
 *   schemas:
 *      IClockTransaction:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *          empCode:
 *            type: string
 *          punchTime:
 *            type: string
 *            format: date-time
 *          punchState:
 *            type: string
 *          verifyType:
 *            type: integer
 *          workCode:
 *            type: string
 *          terminalSn:
 *            type: string
 *          terminalAlias:
 *            type: string
 *          areaAlias:
 *            type: string
 *          longitude:
 *            type: number
 *          latitude:
 *            type: number
 *          gpsLocation:
 *            type: string
 *          mobile:
 *            type: string
 *          source:
 *            type: integer
 *          purpose:
 *            type: integer
 *          crc:
 *            type: string
 *          isAttendance:
 *            type: integer
 *          reserved:
 *            type: string
 *          uploadTime:
 *            type: string
 *            format: date-time
 *          syncStatus:
 *            type: integer
 *          syncTime:
 *            type: string
 *            format: date-time
 *          empId:
 *            type: integer
 *          terminalId:
 *            type: integer
 *          isMask:
 *            type: integer
 *          temperature:
 *            type: number
 *          createdAt:
 *            type: string
 *            format: date-time
 *          updatedAt:
 *            type: string
 *            format: date-time
 */
export default class IClockTransaction extends BaseModel {
  static table = 'iclock_transaction'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare empCode: string

  @column.dateTime()
  declare punchTime: DateTime

  @column()
  declare punchState: string

  @column()
  declare verifyType: number

  @column()
  declare workCode: string | null

  @column()
  declare terminalSn: string

  @column()
  declare terminalAlias: string

  @column()
  declare areaAlias: string

  @column()
  declare longitude: number | null

  @column()
  declare latitude: number | null

  @column()
  declare gpsLocation: string

  @column()
  declare mobile: string

  @column()
  declare source: number

  @column()
  declare purpose: number

  @column()
  declare crc: string

  @column()
  declare isAttendance: number

  @column()
  declare reserved: string

  @column.dateTime()
  declare uploadTime: DateTime

  @column()
  declare syncStatus: number

  @column.dateTime()
  declare syncTime: DateTime

  @column()
  declare empId: number

  @column()
  declare terminalId: number

  @column()
  declare isMask: number

  @column()
  declare temperature: number

  @belongsTo(() => PersonnelEmployee, { foreignKey: 'empId' })
  declare employee: BelongsTo<typeof PersonnelEmployee>

  @belongsTo(() => IClockTerminal, { foreignKey: 'terminalId' })
  declare terminal: BelongsTo<typeof IClockTerminal>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
