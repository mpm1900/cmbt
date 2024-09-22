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
  const rating = targets
    .flatMap((target) => {
      const isAlly = target.teamId === source.teamId
      const damages = getActionDamageRating(action, source, target)
      return damages.map((d) => (isAlly ? d * -1 : d))
    })
    .reduce((p, c) => p + c, 0)
  const weight = rating * accuracy * random.float(0.8, 1.2)

  return {
    id: nanoid(),
    action,
    targetIds: targets.map((t) => t.id),
    weight,
  }
}
