import { Damage, DamageType } from '../types'

export function getDamageTypesFromDamages(damages: Damage[]): DamageType[] {
  return Array.from(
    new Set(
      damages
        .filter((d) => d.damageType !== undefined)
        .map((d) => d.damageType!)
    )
  )
}
