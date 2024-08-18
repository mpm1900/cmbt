import { AttackTypes } from './Unit'

export type DamageType = 'arcane' | 'fire' | 'force' | 'shock'

export type Damage = {
  attackType: AttackTypes
  damageType?: DamageType
  value: number
}
