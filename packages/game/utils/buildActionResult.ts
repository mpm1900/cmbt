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
  'success' | 'source' | 'targets' | 'data' | 'action'
>

export function buildActionResult(
  action: Action,
  data: ActionResolveData,
  source: Unit,
  targets: Unit[],
  ctx: CombatContext,
  config: (targets: Unit[]) => {
    forceFailure?: boolean
    onSuccess?: ParseActionResult
    onFailure?: ParseActionResult
  }
): ActionResult {
  const { accuracyRoll, setLastUsed } = data
  const modifiedTargets = targets.map(
    (target) => applyModifiers(target, ctx).unit
  )
  const {
    forceFailure,
    onSuccess = {},
    onFailure = {},
  } = config(
    action
      .mapTargets(modifiedTargets, ctx)
      .filter((target) => !target.flags.isProtected)
  )
  if (accuracyRoll.success && !forceFailure) {
    const { mutations = [] } = onSuccess
    return {
      ...onSuccess,
      success: true,
      action,
      data,
      source,
      targets,
      mutations: [setLastUsed, ...mutations],
    }
  }
  if (!accuracyRoll.success || forceFailure) {
    const { mutations = [] } = onFailure
    return {
      ...onFailure,
      success: false,
      action,
      data,
      source,
      targets,
      mutations: [setLastUsed, ...mutations],
    }
  }
  return {}
}
