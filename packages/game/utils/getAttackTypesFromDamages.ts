import { AttackType, Damage } from '../types'

export function getAttackTypesFromDamages(damages: Damage[]): AttackType[] {
  return Array.from(
    new Set(
      damages
        .filter((d) => d.attackType !== undefined)
        .map((d) => d.attackType!)
    )
  )
}
