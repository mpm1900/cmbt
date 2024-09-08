import random from 'random'
import { ActionAccuracyResult, Damage, DamageType, Unit } from '../types'

export function calculateBaseDamage(
  damage: Damage,
  source: Unit | undefined,
  target: Unit
): number {
  const { power, factor, attackType } = damage

  if (power && source) {
    let base = power
    if (attackType === 'physical')
      base = power * (source.stats.attack / target.stats.defense)
    if (attackType === 'magic')
      base = power * (source.stats.magic / target.stats.magic)

    const levelMod = (source.level * 2) / 5 + 2
    const final = (base * levelMod) / 50 + 2
    return final
  }

  if (factor) {
    const base = target.stats.health * factor
    return base
  }

  return 0
}

export function getDamageNegation(
  type: DamageType | undefined,
  target: Unit | undefined
) {
  if (!type || !target) return 1
  const typeNegation = target.stats[`${type}Negation`]
  return (100 - typeNegation) / 100
}

export function getDamageExpansion(
  type: DamageType | undefined,
  source: Unit | undefined
) {
  if (!type || !source) return 1
  const typeExpansion = source.stats[`${type}Expansion`]
  return typeExpansion / 100
}

export function getTypedDamage(
  type: DamageType | undefined,
  damage: number,
  source: Unit | undefined,
  target: Unit
) {
  return (
    damage * getDamageExpansion(type, source) * getDamageNegation(type, target)
  )
}

export type CalculateDamageConfig = ActionAccuracyResult & {
  randomFactor?: number
}

export type CalculateDamageResult = {
  damage: number
  evasionSuccess: boolean
  physicalArmor: number
  magicArmor: number
}

export function calculateDamage(
  damage: Damage,
  source: Unit,
  target: Unit,
  config: CalculateDamageConfig
): CalculateDamageResult {
  const base = calculateBaseDamage(damage, source, target)
  const evasionRoll = random.int(0, 100)
  const evasionSuccess = target.stats.evasion > evasionRoll
  const typedDamage = getTypedDamage(damage.damageType, base, source, target)

  const criticalFactor = config.criticalSuccess
    ? (config.criticalFactor ?? 1)
    : 1
  const randomFactor =
    config.randomFactor !== undefined ? config.randomFactor : 1

  const damageAmount = Math.round(typedDamage * criticalFactor * randomFactor)

  const physicalArmor =
    damage.attackType === 'physical' && !evasionSuccess
      ? Math.max(Math.min(target.values.physicalArmor, damageAmount), 0)
      : 0
  const magicArmor =
    damage.attackType === 'magic' && !evasionSuccess
      ? Math.max(Math.min(target.values.magicArmor, damageAmount), 0)
      : 0

  return {
    damage: evasionSuccess ? 0 : damageAmount - physicalArmor - magicArmor,
    evasionSuccess,
    physicalArmor,
    magicArmor,
  }
}
