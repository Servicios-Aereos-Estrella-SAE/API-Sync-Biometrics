import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import IClockTransaction from '#models/iclock_transaction'
import PersonnelDepartment from '#models/personnel_department'
import PersonnelPosition from '#models/personnel_position'

/**
 * @swagger
 * components:
 *   schemas:
 *     PersonnelEmployee:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *        createTime:
 *          type: string
 *          format: date-time
 *        createUser:
 *          type: string
 *        changeTime:
 *          type: string
 *          format: date-time
 *        changeUser:
 *          type: string
 *        status:
 *          type: integer
 *        empCode:
 *          type: integer
 *        firstName:
 *          type: string
 *        lastName:
 *          type: string
 *        nickname:
 *          type: string
 *        passport:
 *          type: string
 *        driverLicenseAutomobile:
 *          type: string
 *        driverLicenseMotorcycle:
 *          type: string
 *        photo:
 *          type: string
 *        selfPassword:
 *          type: string
 *        devicePassword:
 *          type: string
 *        devPrivilege:
 *          type: integer
 *        cardNo:
 *          type: string
 *        accGroup:
 *          type: string
 *        accTimezone:
 *          type: string
 *        gender:
 *          type: string
 *        birthday:
 *          type: string
 *          format: date
 *        address:
 *          type: string
 *        postcode:
 *          type: string
 *        officeTel:
 *          type: string
 *        contactTel:
 *          type: string
 *        mobile:
 *          type: string
 *        nationalNum:
 *          type: string
 *        payrollNum:
 *          type: string
 *        internalEmpNum:
 *          type: string
 *        national:
 *          type: string
 *        religion:
 *          type: string
 *        title:
 *          type: string
 *        enrollSn:
 *          type: string
 *        ssn:
 *          type: string
 *        updateTime:
 *          type: string
 *          format: date-time
 *        hireDate:
 *          type: string
 *          format: date
 *        verifyMode:
 *          type: integer
 *        city:
 *          type: string
 *        isAdmin:
 *          type: boolean
 *        empType:
 *          type: integer
 *        enableAtt:
 *          type: boolean
 *        enablePayroll:
 *          type: boolean
 *        enableOvertime:
 *          type: boolean
 *        enableHoliday:
 *          type: boolean
 *        deleted:
 *          type: boolean
 *        reserved:
 *          type: integer
 *        delTag:
 *          type: integer
 *        appStatus:
 *          type: integer
 *        appRole:
 *          type: integer
 *        email:
 *          type: string
 *        lastLogin:
 *          type: string
 *          format: date-time
 *        isActive:
 *          type: boolean
 *        vacationRule:
 *          type: integer
 *        companyId:
 *          type: integer
 *        departmentId:
 *          type: integer
 *        positionId:
 *          type: integer
 */

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

  @belongsTo(() => PersonnelDepartment, {
    foreignKey: 'departmentId',
  })
  declare personnelDepartment: BelongsTo<typeof PersonnelDepartment>

  @belongsTo(() => PersonnelPosition, {
    foreignKey: 'positionId',
  })
  declare personnelPosition: BelongsTo<typeof PersonnelPosition>

  @hasMany(() => IClockTransaction, { foreignKey: 'empId' })
  declare transactions: HasMany<typeof IClockTransaction>
}
