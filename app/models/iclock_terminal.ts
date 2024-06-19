import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import IClockTransaction from '#models/iclock_transaction'
/**
 * @swagger
 * definitions:
 *   IClockTerminal:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       createTime:
 *         type: string
 *         format: date-time
 *       createUser:
 *         type: string
 *       changeTime:
 *         type: string
 *         format: date-time
 *       changeUser:
 *         type: string
 *       status:
 *         type: integer
 *       sn:
 *         type: string
 *       alias:
 *         type: string
 *       ipAddress:
 *         type: string
 *       realIp:
 *         type: string
 *       state:
 *         type: integer
 *       terminalTz:
 *         type: integer
 *       heartbeat:
 *         type: integer
 *       transferMode:
 *         type: integer
 *       transferInterval:
 *         type: integer
 *       transferTime:
 *         type: string
 *       productType:
 *         type: integer
 *       isAttendance:
 *         type: integer
 *       isRegistration:
 *         type: integer
 *       purpose:
 *         type: integer
 *       controllerType:
 *         type: integer
 *       authentication:
 *         type: integer
 *       style:
 *         type: string
 *       uploadFlag:
 *         type: string
 *       fwVer:
 *         type: string
 *       pushProtocol:
 *         type: string
 *       pushVer:
 *         type: string
 *       language:
 *         type: integer
 *       isTft:
 *         type: boolean
 *       terminalName:
 *         type: string
 *       platform:
 *         type: string
 *       oemVendor:
 *         type: string
 *       logStamp:
 *         type: string
 *       opLogStamp:
 *         type: string
 *       captureStamp:
 *         type: string
 *       userCount:
 *         type: integer
 *       userCapacity:
 *         type: integer
 *       photoFuncOn:
 *         type: boolean
 *       transactionCount:
 *         type: integer
 *       transactionCapacity:
 *         type: integer
 *       fpFuncOn:
 *         type: boolean
 *       fpCount:
 *         type: integer
 *       fpCapacity:
 *         type: integer
 *       fpAlgVer:
 *         type: string
 *       faceFuncOn:
 *         type: boolean
 *       faceCount:
 *         type: integer
 *       faceCapacity:
 *         type: integer
 *       faceAlgVer:
 *         type: string
 *       fvFuncOn:
 *         type: boolean
 *       fvCount:
 *         type: integer
 *       fvCapacity:
 *         type: integer
 *       fvAlgVer:
 *         type: string
 *       palmFuncOn:
 *         type: boolean
 *       palmCount:
 *         type: integer
 *       palmCapacity:
 *         type: integer
 *       palmAlgVer:
 *         type: string
 *       lockFunc:
 *         type: integer
 *       lastActivity:
 *         type: string
 *         format: date-time
 *       uploadTime:
 *         type: string
 *         format: date-time
 *       pushTime:
 *         type: string
 *         format: date-time
 *       isAccess:
 *         type: integer
 *       areaId:
 *         type: integer
 *       companyId:
 *         type: integer
 *       transactions:
 *         type: array
 *         items:
 *           $ref: '#/definitions/IClockTransaction'
 */
export default class IClockTerminal extends BaseModel {
  static table = 'iclock_terminal'
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime()
  declare createTime: DateTime

  @column()
  declare createUser: string

  @column.dateTime()
  declare changeTime: DateTime

  @column()
  declare changeUser: string

  @column()
  declare status: number

  @column()
  declare sn: string

  @column()
  declare alias: string

  @column()
  declare ipAddress: string

  @column()
  declare realIp: string

  @column()
  declare state: number

  @column()
  declare terminalTz: number

  @column()
  declare heartbeat: number

  @column()
  declare transferMode: number

  @column()
  declare transferInterval: number

  @column()
  declare transferTime: string

  @column()
  declare productType: number

  @column()
  declare isAttendance: number

  @column()
  declare isRegistration: number

  @column()
  declare purpose: number

  @column()
  declare controllerType: number

  @column()
  declare authentication: number

  @column()
  declare style: string

  @column()
  declare uploadFlag: string

  @column()
  declare fwVer: string

  @column()
  declare pushProtocol: string

  @column()
  declare pushVer: string

  @column()
  declare language: number

  @column()
  declare isTft: boolean

  @column()
  declare terminalName: string

  @column()
  declare platform: string

  @column()
  declare oemVendor: string

  @column()
  declare logStamp: string

  @column()
  declare opLogStamp: string

  @column()
  declare captureStamp: string

  @column()
  declare userCount: number

  @column()
  declare userCapacity: number

  @column()
  declare photoFuncOn: boolean

  @column()
  declare transactionCount: number

  @column()
  declare transactionCapacity: number

  @column()
  declare fpFuncOn: boolean

  @column()
  declare fpCount: number

  @column()
  declare fpCapacity: number

  @column()
  declare fpAlgVer: string

  @column()
  declare faceFuncOn: boolean

  @column()
  declare faceCount: number

  @column()
  declare faceCapacity: number

  @column()
  declare faceAlgVer: string

  @column()
  declare fvFuncOn: boolean

  @column()
  declare fvCount: number

  @column()
  declare fvCapacity: number

  @column()
  declare fvAlgVer: string

  @column()
  declare palmFuncOn: boolean

  @column()
  declare palmCount: number

  @column()
  declare palmCapacity: number

  @column()
  declare palmAlgVer: string

  @column()
  declare lockFunc: number

  @column.dateTime()
  declare lastActivity: DateTime

  @column.dateTime()
  declare uploadTime: DateTime

  @column.dateTime()
  declare pushTime: DateTime

  @column()
  declare isAccess: number

  @column()
  declare areaId: number

  @column()
  declare companyId: number

  @hasMany(() => IClockTransaction)
  declare transactions: HasMany<typeof IClockTransaction>
}
