import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import IClockTransaction from '#models/iclock_transaction'

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
