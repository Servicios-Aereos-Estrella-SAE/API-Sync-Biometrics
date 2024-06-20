export default class PersonnelPositionDto {
  declare id: number
  declare positionCode: string
  declare positionName: string
  declare isDefault: boolean

  constructor(id: number, positionCode: string, positionName: string, isDefault: boolean) {
    this.id = id
    this.positionCode = positionCode
    this.positionName = positionName
    this.isDefault = isDefault
  }
}
