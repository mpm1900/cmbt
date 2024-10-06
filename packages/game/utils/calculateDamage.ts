import random from 'random'
import { FlyingId, GroundBasedId } from '../data'
import {
  ActionAccuracyResult,
  AttackType,
  Damage,
  DamageType,
  Id,
  Tag,
  Unit,
} from '../types'
import { convertAttackType } from './convertAttackType'

export function getAttackDefenseRatio(
  power: number,
  attackType: AttackType | undefined,
  source: Unit,
  target: Unit
) {
  let result = power
  if (attackType === 'physical') {
    result = power * (source.stats.attack / target.stats.defense)
  }

  if (attackType === 'magic') {
    result = power * (source.stats.magic / target.stats.magicDefense)
  }

  if (attackType === 'physical-reverse') {
    result = power * (source.stats.attack / target.stats.magicDefense)
  }

  if (attackType === 'magic-reverse') {
    result = power * (source.stats.magic / target.stats.defense)
  }

  return result
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
  const typeNegation = target.stats[`${convertAttackType(type, true)}Negation`]
  return (100 - typeNegation) / 100
}
export function getAttackTypeExpansion(
  type: AttackType | undefined,
  target: Unit | undefined
) {
  if (!type || !target) return 1
  const typeExpansion = target.stats[`${convertAttackType(type)}Expansion`]
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
const hasTag = (tags: Tag[]) => (finder: Partial<Tag>) => {
  return tags.some((t) => t.id === finder.id || t.label === finder.label)
}
export type GetTagsMultiplierConfig = {
  actionTags: Tag[]
  targetTags: Tag[]
  sourceTags: Tag[]
}
export function getTagsMultiplier(config: GetTagsMultiplierConfig) {
  const action = hasTag(config.actionTags)
  const target = hasTag(config.targetTags)
  const source = hasTag(config.sourceTags)
  if (action({ id: GroundBasedId }) && target({ id: FlyingId })) return 0
  return 1
}

export function getDamageResult(props: {
  target: Unit
  evasionSuccess: boolean
  damages: {
    attackType: AttackType | undefined
    damage: number
    result?: CalculateDamageAmountResult
  }[]
}) {
  const { evasionSuccess, target, damages } = props

  let results: CalculateDamageAmountResult[] = []
  let damage = 0
  let physicalArmor = 0
  let magicArmor = 0

  let unitPhysicalArmor = target.values.physicalArmor
  let unitMagicArmor = target.values.magicArmor

  if (evasionSuccess) {
    return {
      results,
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
    if (value.result) {
      results.push(value.result)
    }
  })

  return {
    damage,
    evasionSuccess,
    physicalArmor,
    magicArmor,
    results,
  }
}

export type CalculateDamageConfig = Partial<ActionAccuracyResult> & {
  actionTags?: Tag[]
  randomFactor?: number
  evasionSuccess?: boolean
}

export type CalculateDamageAmountResult = {
  sourceId?: Id
  targetId: Id
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
  const tagFactor = getTagsMultiplier({
    actionTags: config?.actionTags ?? [],
    sourceTags: source?.tags ?? [],
    targetTags: target.tags,
  })

  const raw =
    base *
    attackTypeFactor *
    damageTypeFactor *
    criticalFactor *
    tagFactor *
    randomFactor

  const remainingHealth = target.stats.health - target.values.damage
  const final = Math.min(remainingHealth, Math.round(raw))

  return {
    sourceId: source?.id,
    targetId: target.id,
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
  results: CalculateDamageAmountResult[]
}

export function calculateDamages(
  damages: Damage[],
  source: Unit | undefined,
  target: Unit,
  config: CalculateDamageConfig
): CalculateDamageResult {
  const evasionRoll = random.int(0, 100)
  const evasionSuccess =
    config.evasionSuccess === undefined
      ? target.stats.evasion > evasionRoll
      : config.evasionSuccess

  return getDamageResult({
    target,
    evasionSuccess,
    damages: damages.map((damage) => {
      const result = calculateDamageAmount(damage, source, target, config)
      return {
        damage: result.final,
        attackType: damage.attackType,
        result,
      }
    }),
  })
}
