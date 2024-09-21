import { AttackType, UnitAttackType } from '../types'

export function convertAttackType(
  type: AttackType,
  reverse: boolean = false
): UnitAttackType {
  if (type === 'magic-reverse') return reverse ? 'physical' : 'magic'
  if (type === 'physical-reverse') return reverse ? 'magic' : 'physical'
  return type
}
