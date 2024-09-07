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
  'blight',
  'fire',
  'force',
  'holy',
  'psychic',
  'shock',
]

export type Damage = {
  attackType: AttackTypes
  damageType?: DamageType
  value: number
}
