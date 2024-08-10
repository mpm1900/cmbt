import {
  AttackTypes,
  Damage,
  DamageType,
  ActionAccuracyResult,
  Unit,
} from '../types'

export function calculateBaseDamage(
  power: number,
  attackType: AttackTypes,
  source: Unit,
  target: Unit
): number {
  if (attackType === 'physical')
    return power * (source.stats.physical / target.stats.defense)

  if (attackType === 'magic')
    return power * (source.stats.magic / target.stats.magic)

  return power
}

export function getDamageNegation(type: DamageType | undefined, target: Unit) {
  if (!type) return 1
  const typeNegation = target.stats[`${type}Negation`]
  return 1 - typeNegation
}

export function getDamageExpansion(type: DamageType | undefined, target: Unit) {
  if (!type) return 1
  const typeExpansion = target.stats[`${type}Expansion`]
  return 1 + typeExpansion / 100
}

export type CalculateDamageConfig = ActionAccuracyResult & {
  randomFactor?: number
}

export type CalculateDamageResult = {
  damage: number
  physicalArmor: number
  magicArmor: number
}

export function calculateDamage(
  damage: Damage,
  source: Unit,
  target: Unit,
  config: CalculateDamageConfig
): CalculateDamageResult {
  const base = calculateBaseDamage(
    damage.value,
    damage.attackType,
    source,
    target
  )
  const negation = getDamageNegation(damage.damageType, target)
  const expansion = getDamageExpansion(damage.damageType, target)
  if (negation != 1) console.log(damage.value, negation)

  const criticalFactor = config.criticalSuccess
    ? (config.criticalFactor ?? 1)
    : 1

  const randomFactor =
    config.randomFactor !== undefined ? config.randomFactor : 1

  const damageAmount = Math.round(
    base * negation * expansion * criticalFactor * randomFactor
  )
  const physicalArmor =
    damage.attackType === 'physical'
      ? Math.max(Math.min(target.values.physicalArmor, damageAmount), 0)
      : 0

  const magicArmor =
    damage.attackType === 'magic'
      ? Math.max(Math.min(target.values.magicArmor, damageAmount), 0)
      : 0

  return {
    damage: damageAmount - physicalArmor - magicArmor,
    physicalArmor,
    magicArmor,
  }
}
