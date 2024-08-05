import { Action, CombatContext } from '../types'
import { getPermutations } from './getPermutations'

export function getBestAiAction(action: Action, ctx: CombatContext) {
  const possibleTargets = action.targets.resolve(ctx)
  const targetSets = getPermutations(possibleTargets, action.maxTargetCount)
  const weightedSets = targetSets
    .map((targets) => action.getAi(targets, ctx))
    .sort((a, b) => b.weight - a.weight)

  return weightedSets[0]
}
