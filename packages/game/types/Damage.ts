import { AttackTypes } from './Unit'

export type DamageType =
  | 'arcane'
  | 'blight'
  | 'fire'
  | 'force'
  | 'holy'
  | 'psychic'
  | 'shock'

export const DAMAGE_TYPES: DamageType[] = [
  'arcane',
  'psychic',
  'shock',
  'blight',
  'holy',
  'fire',
  'force',
]

export type Damage = {
  attackType: AttackTypes
  damageType?: DamageType
  power?: number
  factor?: number
}
