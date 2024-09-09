import { AttackType } from './Unit'

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
  attackType: AttackType
  damageType?: DamageType
  power?: number
  factor?: number
}
