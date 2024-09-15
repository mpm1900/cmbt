import { Action, Unit } from '../types'

export function getPriority(action: Action, unit: Unit | undefined): number {
  if (!unit) return action.priority
  const attackType = action.damages[0]?.attackType
  const damageType = action.damages[0]?.damageType
  const attackTypeOffset = attackType ? unit.stats[`${attackType}Priority`] : 0
  const damageTypeOffset = damageType ? unit.stats[`${damageType}Priority`] : 0
  const nonDamageOffset =
    !attackType && !damageType ? unit.stats.nonDamagePriority : 0
  return (
    action.priority +
    unit.stats.priority +
    attackTypeOffset +
    damageTypeOffset +
    nonDamageOffset
  )
}
