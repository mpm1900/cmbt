import { GameContext, Unit } from '../types'
import { applyModifiers } from './applyModifiers'

function canAct(unit: Unit) {
  return unit.flags.isActive && !unit.flags.isRecharging
}

export function getActionableUnits(units: Unit[]) {
  return units.filter((u) => canAct(u))
}

export function getActionableUnitsCtx(ctx: GameContext) {
  return getActionableUnits(ctx.units.map((u) => applyModifiers(u, ctx).unit))
}
