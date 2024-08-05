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
  return 1 - typeNegation / 100
}

export function getDamageExpansion(type: DamageType | undefined, target: Unit) {
  if (!type) return 1
  const typeExpansion = target.stats[`${type}Expansion`]
  return 1 + typeExpansion / 100
}

export function getCriticalFactor(critical: boolean, source: Unit) {
  return critical ? 1.5 : 1
}

export type CalculateDamageConfig = ActionAccuracyResult & {
  randomFactor?: number
}

export function calculateDamage(
  power: Damage,
  source: Unit,
  target: Unit,
  config: CalculateDamageConfig
): number {
  const base = calculateBaseDamage(
    power.value,
    power.attackType,
    source,
    target
  )
  const negation = getDamageNegation(power.damageType, target)
  const expansion = getDamageExpansion(power.damageType, target)
  if (negation != 1) console.log(power, negation, target)

  const criticalFactor = config.criticalSuccess ? (config.critical ?? 1) : 1
  const randomFactor =
    config.randomFactor !== undefined ? config.randomFactor : 1
  return Math.round(base * negation * expansion * criticalFactor * randomFactor)
}
