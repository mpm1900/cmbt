import {
  Action,
  ActionResolveData,
  ActionResult,
  CombatContext,
  Unit,
} from '../types'
import { applyModifiers } from './applyModifiers'

export type ParseActionResult = Omit<
  ActionResult,
  'source' | 'targets' | 'data' | 'action'
>

export function buildActionResult(
  action: Action,
  data: ActionResolveData,
  source: Unit,
  targets: Unit[],
  ctx: CombatContext,
  config: (targets: Unit[]) => {
    onSuccess?: ParseActionResult
    onFailure?: ParseActionResult
  }
): ActionResult {
  const { accuracyRoll, setLastUsed } = data
  const modifiedTargets = targets.map(
    (target) => applyModifiers(target, ctx).unit
  )
  const { onSuccess = {}, onFailure = {} } = config(
    action
      .mapTargets(modifiedTargets, ctx)
      .filter((target) => !target.flags.isProtected)
  )
  if (accuracyRoll.success) {
    const { mutations = [] } = onSuccess
    return {
      ...onSuccess,
      action,
      data,
      source,
      targets,
      mutations: [setLastUsed, ...mutations],
    }
  } else {
    const { mutations = [] } = onFailure
    return {
      ...onFailure,
      action,
      data,
      source,
      targets,
      mutations: [setLastUsed, ...mutations],
    }
  }
}
