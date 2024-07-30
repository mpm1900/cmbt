import { applyModifiers } from '.'
import { GameContext, Id, Unit } from '../types'

export function isUnitAlive(unit: Unit) {
  return unit.stats.health > unit.values.damage
}

export function isUnitAliveCtx(
  unitId: Id | undefined,
  ctx: GameContext
): boolean {
  const unit = ctx.units.find((u) => u.id === unitId)
  if (!unit) return false
  const modified = applyModifiers(unit, ctx).unit
  return isUnitAlive(modified)
}
