import { CombatContext, Unit } from '../types'
import { applyModifiers } from './applyModifiers'

export function isUnitHidden(unit: Unit): boolean {
  return unit.flags.isHidden
}

export function isUnitHiddenCtx(unit: Unit, ctx: CombatContext): boolean {
  return isUnitHidden(applyModifiers(unit, ctx).unit)
}
