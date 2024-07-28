import { SetLastUsedAction } from '../data'
import { Action, GameContext, Unit } from '../types'
import { applyModifiers } from './applyModifiers'
import { rollThreshold, RollAccuracyResult } from './rollThreshold'

export type ActionRenderData = {
  source: Unit
  accuracyRoll: RollAccuracyResult
  setLastUsed: SetLastUsedAction
}

export function getActionData(
  source: Unit,
  action: Action,
  ctx: GameContext
): ActionRenderData {
  const modifiedSource = applyModifiers(source, ctx).unit
  const accuracyRoll = rollThreshold(modifiedSource, action)
  const setLastUsed = new SetLastUsedAction({
    sourceId: source.id,
    parentId: source.id,
    actionId: action.id,
  })

  return {
    source: modifiedSource,
    accuracyRoll,
    setLastUsed,
  }
}
