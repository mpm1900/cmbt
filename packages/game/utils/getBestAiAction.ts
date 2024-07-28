import { Action, GameContext, Unit } from '../types'
import { getPermutations } from './getPermutations'

export function getBestAiAction(
  action: Action,
  units: Unit[],
  ctx: GameContext
) {
  const possibleTargets = units.filter((u) => action.targets(u, ctx))
  const targetSets = getPermutations(possibleTargets, action.maxTargetCount)
  const weightedSets = targetSets
    .map((targets) => action.getAiAction(targets, ctx))
    .sort((a, b) => b.weight - a.weight)

  return weightedSets[0]
}
