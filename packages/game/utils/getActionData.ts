import { SetLastUsedAction } from '../data'
import { Action, ActionResolveData, CombatContext, Unit } from '../types'
import { applyModifiers } from './applyModifiers'
import { rollThreshold } from './rollThreshold'

export function getActionData(
  source: Unit,
  action: Action,
  ctx: CombatContext
): ActionResolveData {
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
