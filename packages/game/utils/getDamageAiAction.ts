import random from 'random'
import { Action, CombatContext, Unit } from '../types'
import { applyModifiers } from './applyModifiers'
import { getActionDamage } from './getActionDamage'

export function getDamageAi(
  action: Action,
  targets: Unit[],
  ctx: CombatContext
) {
  const source = ctx.units.find((u) => u.id === action.sourceId) as Unit
  const modifiedSource = applyModifiers(source, ctx).unit
  const unModifiedTargets = ctx.units.filter(
    (u) => !!targets.find((t) => t.id === u.id)
  )
  const accuracy = (action.threshold(modifiedSource) ?? 100) / 100
  const damage = getActionDamage(action, source, unModifiedTargets, ctx).reduce(
    (p, c) => p + c,
    0
  )
  const weight = damage * accuracy * random.float(0.85, 1.15)

  return {
    action,
    targetIds: targets.map((t) => t.id),
    weight,
  }
}
