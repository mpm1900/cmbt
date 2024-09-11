import { Action, CombatContext } from '../types'
import { getPermutations } from './getPermutations'

export function getBestAiAction(action: Action, ctx: CombatContext) {
  const possibleTargets = action.targets.resolve(ctx)
  const maxTargetCount = Math.min(action.maxTargetCount, possibleTargets.length)
  const targetSets =
    maxTargetCount === 0
      ? [[]]
      : getPermutations(possibleTargets, maxTargetCount)

  const weightedSets = targetSets
    .map((targets) => action.getAi(targets, ctx))
    .sort((a, b) => b.weight - a.weight)

  return weightedSets[0]
}
