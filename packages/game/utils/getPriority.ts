import { Action, Unit } from '../types'
import { getAttackTypesFromDamages } from './getAttackTypesFromDamages'
import { getDamageTypesFromDamages } from './getDamageTypesFromDamages'

export function getPriority(action: Action, unit: Unit | undefined): number {
  if (!unit) return action.priority
  const attackTypes = getAttackTypesFromDamages(action.damages)
  const damageTypes = getDamageTypesFromDamages(action.damages)
  const attackTypePriorities = attackTypes.map(
    (t) => unit.stats[`${t}Priority`]
  )
  const damageTypePriorities = damageTypes.map(
    (t) => unit.stats[`${t}Priority`]
  )

  const attackTypeOffset =
    attackTypes.length > 0 ? Math.max(...attackTypePriorities) : 0
  const damageTypeOffset =
    attackTypes.length > 0 ? Math.max(...damageTypePriorities) : 0

  const nonDamageOffset =
    attackTypes.length === 0 && damageTypes.length == 0
      ? unit.stats.nonDamagePriority
      : 0

  return (
    action.priority +
    unit.stats.priority +
    attackTypeOffset +
    damageTypeOffset +
    nonDamageOffset
  )
}
