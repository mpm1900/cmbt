import { applyModifiers } from '.'
import { CombatContext, Id, Unit } from '../types'

export function isUnitAlive(unit: Unit) {
  return unit.stats.health > unit.values.damage
}

export function isUnitAliveCtx(
  unitId: Id | undefined,
  ctx: CombatContext
): boolean {
  const unit = ctx.units.find((u) => u.id === unitId)
  if (!unit) return false
  const modified = applyModifiers(unit, ctx).unit
  return isUnitAlive(modified)
}
