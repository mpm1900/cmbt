import { AttackTypes, Unit } from './Unit'

export type DamageType = 'fire' | 'force' | 'lightning'

export type Damage = {
  attackType: AttackTypes
  damageType?: DamageType
  value: number
}
