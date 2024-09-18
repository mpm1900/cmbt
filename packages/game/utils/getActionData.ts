import { SetLastUsedAction } from '../data'
import { Action, ActionResolveData, CombatContext, Unit } from '../types'
import { applyModifiers } from './applyModifiers'
import { rollThreshold } from './rollThreshold'

export function getActionData(
  source: Unit,
  action: Action,
  ctx: CombatContext,
  mapThreshold?: (threshold: number | undefined) => number | undefined
): ActionResolveData {
  let threshold = action.threshold(source)
  if (mapThreshold) threshold = mapThreshold(threshold)
  const criticalThreshold = action.criticalThreshold(source)
  const criticalFactor = action.criticalFactor(source)
  const modifiedSource = applyModifiers(source, ctx).unit
  const accuracyRoll = rollThreshold(
    threshold,
    criticalThreshold,
    criticalFactor
  )
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
