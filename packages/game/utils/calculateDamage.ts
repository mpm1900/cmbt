import random from 'random'
import {
  ActionAccuracyResult,
  AttackType,
  Damage,
  DamageType,
  Unit,
} from '../types'

export function getAttackDefenseRatio(
  power: number,
  attackType: AttackType | undefined,
  source: Unit,
  target: Unit
) {
  if (attackType === 'physical') {
    return power * (source.stats.attack / target.stats.defense)
  }

  if (attackType === 'magic') {
    return power * (source.stats.magic / target.stats.magic)
  }

  return power
}

export function calculateBaseDamage(
  damage: Damage,
  source: Unit | undefined,
  target: Unit
): number {
  const { power, factor, attackType } = damage

  if (power && source) {
    const base = getAttackDefenseRatio(power, attackType, source, target)
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

export function getDamageTypeMultiplier(
  type: DamageType | undefined,
  source: Unit | undefined,
  target: Unit
) {
  return getDamageExpansion(type, source) * getDamageNegation(type, target)
}
export function getAttackTypeMultiplier(
  type: AttackType | undefined,
  source: Unit | undefined,
  target: Unit
) {
  return (
    getAttackTypeExpansion(type, source) * getAttackTypeNegation(type, target)
  )
}

export function getDamageResult(props: {
  target: Unit
  evasionSuccess: boolean
  damages: {
    attackType: AttackType | undefined
    damage: number
  }[]
}) {
  const { evasionSuccess, target, damages } = props

  let damage = 0
  let physicalArmor = 0
  let magicArmor = 0

  let unitPhysicalArmor = target.values.physicalArmor
  let unitMagicArmor = target.values.magicArmor

  if (evasionSuccess) {
    return {
      evasionSuccess,
      damage,
      physicalArmor,
      magicArmor,
    }
  }

  damages.forEach((value) => {
    if (value.attackType === 'physical') {
      const removedArmor = Math.max(Math.min(unitPhysicalArmor, value.damage))
      physicalArmor += removedArmor
      unitPhysicalArmor -= removedArmor
    }
    if (value.attackType === 'magic') {
      const removedArmor = Math.max(Math.min(unitMagicArmor, value.damage), 0)
      magicArmor += removedArmor
      unitPhysicalArmor -= removedArmor
    }

    damage += value.damage - (physicalArmor + magicArmor)
  })

  return {
    damage,
    evasionSuccess,
    physicalArmor,
    magicArmor,
  }
}

export type CalculateDamageConfig = ActionAccuracyResult & {
  randomFactor?: number
}

export type CalculateDamageAmountResult = {
  base: number
  attackTypeFactor: number
  damageTypeFactor: number
  criticalFactor: number
  randomFactor: number
  raw: number
  final: number
}

export function calculateDamageAmount(
  damage: Damage,
  source: Unit | undefined,
  target: Unit,
  config?: CalculateDamageConfig
): CalculateDamageAmountResult {
  const base = calculateBaseDamage(damage, source, target)
  const attackTypeFactor = getAttackTypeMultiplier(
    damage.attackType,
    source,
    target
  )
  const damageTypeFactor = getDamageTypeMultiplier(
    damage.damageType,
    source,
    target
  )
  const criticalFactor = config?.criticalSuccess
    ? (config?.criticalFactor ?? 1)
    : 1
  const randomFactor = config?.randomFactor ?? 1

  const raw =
    base * attackTypeFactor * damageTypeFactor * criticalFactor * randomFactor
  const remainingHealth = target.stats.health - target.values.damage
  const final = Math.min(remainingHealth, Math.round(raw))

  return {
    base,
    attackTypeFactor,
    damageTypeFactor,
    criticalFactor,
    randomFactor,
    raw,
    final,
  }
}

export type CalculateDamageResult = {
  damage: number
  evasionSuccess: boolean
  physicalArmor: number
  magicArmor: number
}

export function calculatePureDamage(
  damage: Damage,
  target: Unit
): CalculateDamageResult {
  const result = calculateDamageAmount(damage, undefined, target)

  return getDamageResult({
    target,
    evasionSuccess: false,
    damages: [
      {
        attackType: damage.attackType,
        damage: result.final,
      },
    ],
  })
}

export function calculateDamage(
  damage: Damage,
  source: Unit,
  target: Unit,
  config: CalculateDamageConfig
): CalculateDamageResult {
  const evasionRoll = random.int(0, 100)
  const evasionSuccess = target.stats.evasion > evasionRoll
  const result = calculateDamageAmount(damage, source, target, config)

  return getDamageResult({
    target,
    evasionSuccess,
    damages: [
      {
        attackType: damage.attackType,
        damage: result.final,
      },
    ],
  })
}

export function calculateDamages(
  damages: Damage[],
  source: Unit,
  target: Unit,
  config: CalculateDamageConfig
): CalculateDamageResult {
  const evasionRoll = random.int(0, 100)
  const evasionSuccess = target.stats.evasion > evasionRoll

  return getDamageResult({
    target,
    evasionSuccess,
    damages: damages.map((damage) => ({
      damage: calculateDamageAmount(damage, source, target, config).final,
      attackType: damage.attackType,
    })),
  })
}
