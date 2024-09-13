import { applyModifiers } from '.'
import { CombatContext, Unit } from '../types'

export function isUnitAlive(unit: Unit | undefined) {
  if (!unit) return false
  return unit.stats.health > unit.values.damage
}

export function isUnitAliveCtx(
  unit: Unit | undefined,
  ctx: CombatContext
): boolean {
  if (!unit) return false
  const modified = applyModifiers(unit, ctx).unit
  return isUnitAlive(modified)
}
