import { ZERO_UNIT } from '../data'
import { Action, CombatContext, Unit } from '../types'
import { applyMutation } from './applyModifiers'

export function getActionDamage(
  action: Action,
  source: Unit,
  targets: Unit[],
  ctx: CombatContext
) {
  const { mutations = [] } = action.resolve(source, targets, ctx, {
    bypassAccuracyRolls: true,
    disableLogging: true,
    disableRandomness: true,
  })
  return mutations
    .map((m) => applyMutation(ZERO_UNIT, m))
    .flatMap((u) => u.values.damage)
    .filter((d) => d > 0)
}
