import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import IClockTransaction from '#models/iclock_transaction'

export default class PersonnelEmployee extends BaseModel {
  static table = 'personnel_employee'
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
  declare empCode: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare nickname: string

  @column()
  declare passport: string

  @column()
  declare driverLicenseAutomobile: string

  @column()
  declare driverLicenseMotorcycle: string

  @column()
  declare photo: string

  @column()
  declare selfPassword: string

  @column()
  declare devicePassword: string

  @column()
  declare devPrivilege: number

  @column()
  declare cardNo: string

  @column()
  declare accGroup: string

  @column()
  declare accTimezone: string

  @column()
  declare gender: string

  @column.date()
  declare birthday: DateTime

  @column()
  declare address: string

  @column()
  declare postcode: string

  @column()
  declare officeTel: string

  @column()
  declare contactTel: string

  @column()
  declare mobile: string

  @column()
  declare nationalNum: string

  @column()
  declare payrollNum: string

  @column()
  declare internalEmpNum: string

  @column()
  declare national: string

  @column()
  declare religion: string

  @column()
  declare title: string

  @column()
  declare enrollSn: string

  @column()
  declare ssn: string

  @column.dateTime()
  declare updateTime: DateTime

  @column.date()
  declare hireDate: DateTime

  @column()
  declare verifyMode: number

  @column()
  declare city: string

  @column()
  declare isAdmin: boolean

  @column()
  declare empType: number

  @column()
  declare enableAtt: boolean

  @column()
  declare enablePayroll: boolean

  @column()
  declare enableOvertime: boolean

  @column()
  declare enableHoliday: boolean

  @column()
  declare deleted: boolean

  @column()
  declare reserved: number

  @column()
  declare delTag: number

  @column()
  declare appStatus: number

  @column()
  declare appRole: number

  @column()
  declare email: string

  @column.dateTime()
  declare lastLogin: DateTime

  @column()
  declare isActive: boolean

  @column()
  declare vacationRule: number

  @column()
  declare companyId: number

  @column()
  declare departmentId: number

  @column()
  declare positionId: number

  @hasMany(() => IClockTransaction)
  declare transactions: HasMany<typeof IClockTransaction>
}
