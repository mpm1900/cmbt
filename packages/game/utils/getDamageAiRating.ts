import { nanoid } from 'nanoid'
import random from 'random'
import { Action, ActionAi, CombatContext, Unit } from '../types'
import { applyModifiers } from './applyModifiers'
import { getActionDamageRating } from './getActionDamageRating'

export function getDamageAiRating(
  action: Action,
  targets: Unit[],
  ctx: CombatContext
): ActionAi {
  const source = ctx.units.find((u) => u.id === action.sourceId) as Unit
  const modifiedSource = applyModifiers(source, ctx).unit
  const accuracy = (action.threshold(modifiedSource) ?? 100) / 100
  const allyTargets = targets.filter((u) => u.teamId === source.id)
  const enemeyTargets = targets.filter((u) => u.teamId !== source.id)
  const rating = getActionDamageRating(action).reduce((p, c) => p + c, 0)
  const targetFactor = enemeyTargets.length - allyTargets.length
  const weight = rating * targetFactor * accuracy * random.float(0, 1.2)

  return {
    id: nanoid(),
    action,
    targetIds: targets.map((t) => t.id),
    weight,
  }
}
