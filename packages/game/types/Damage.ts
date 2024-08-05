import { AttackTypes } from './Unit'

export type DamageType =
  | 'arcane'
  | 'blunt'
  | 'fire'
  | 'force'
  | 'shock'
  | 'slash'
  | 'thrust'

export type Damage = {
  attackType: AttackTypes
  damageType?: DamageType
  value: number
}
