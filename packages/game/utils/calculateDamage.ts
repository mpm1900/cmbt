import random from 'random'
import {
  ActionAccuracyResult,
  AttackType,
  Damage,
  DamageType,
  Unit,
} from '../types'

export function calculateBaseDamage(
  damage: Damage,
  source: Unit | undefined,
  target: Unit
): number {
  const { power, factor, attackType } = damage

  if (power && source) {
    let base = power
    if (attackType === 'physical') {
      base = power * (source.stats.attack / target.stats.defense)
    }
    if (attackType === 'magic') {
      base = power * (source.stats.magic / target.stats.magic)
    }

    const level = source.level * 5
    const levelMod = (level * 2) / 5 + 2
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

export function getAttackTypeNegation(
  type: AttackType | undefined,
  target: Unit | undefined
) {
  if (!type || !target) return 1
  const typeNegation = target.stats[`${type}Negation`]
  return (100 - typeNegation) / 100
}

export function getAttackTypeExpansion(
  type: AttackType | undefined,
  target: Unit | undefined
) {
  if (!type || !target) return 1
  const typeExpansion = target.stats[`${type}Expansion`]
  return typeExpansion / 100
}

export function getDamageTypedDamage(
  type: DamageType | undefined,
  damage: number,
  source: Unit | undefined,
  target: Unit
) {
  return (
    damage * getDamageExpansion(type, source) * getDamageNegation(type, target)
  )
}

export function getAttackTypeDamage(
  type: AttackType | undefined,
  damage: number,
  source: Unit | undefined,
  target: Unit
) {
  return (
    damage *
    getAttackTypeExpansion(type, source) *
    getAttackTypeNegation(type, target)
  )
}

export function getDamageResult(props: {
  attackType: AttackType | undefined
  damage: number
  evasionSuccess: boolean
  target: Unit
}) {
  const { attackType, damage, evasionSuccess, target } = props
  const physicalArmor =
    attackType === 'physical' && !evasionSuccess
      ? Math.max(Math.min(target.values.physicalArmor, damage), 0)
      : 0
  const magicArmor =
    attackType === 'magic' && !evasionSuccess
      ? Math.max(Math.min(target.values.magicArmor, damage), 0)
      : 0

  return {
    damage: evasionSuccess ? 0 : damage - physicalArmor - magicArmor,
    evasionSuccess,
    physicalArmor,
    magicArmor,
  }
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
  const attackDamage = getAttackTypeDamage(
    damage.attackType,
    base,
    source,
    target
  )
  const typedDamage = getDamageTypedDamage(
    damage.damageType,
    attackDamage,
    source,
    target
  )

  const criticalFactor = config.criticalSuccess
    ? (config.criticalFactor ?? 1)
    : 1
  const randomFactor =
    config.randomFactor !== undefined ? config.randomFactor : 1

  const remainingHealth = target.stats.health - target.values.damage
  const damageAmount = Math.min(
    remainingHealth,
    Math.round(typedDamage * criticalFactor * randomFactor)
  )

  return getDamageResult({
    attackType: damage.attackType,
    damage: damageAmount,
    evasionSuccess,
    target,
  })
}
