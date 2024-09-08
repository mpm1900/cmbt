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
  const expandedTargets = action
    .mapTargets(modifiedTargets, ctx)
    .filter((target) => !target.flags.isProtected)

  const {
    forceFailure,
    onSuccess = {},
    onFailure = {},
  } = config(expandedTargets)

  if (accuracyRoll.success && !forceFailure && !data.source.flags.isHexed) {
    const { mutations = [] } = onSuccess
    return {
      ...onSuccess,
      success: true,
      action,
      data,
      source,
      targets,
      expandedTargets,
      mutations: [setLastUsed, ...mutations],
    }
  }
  if (!accuracyRoll.success || forceFailure || data.source.flags.isHexed) {
    const { mutations = [] } = onFailure
    return {
      ...onFailure,
      success: false,
      action,
      data,
      source,
      targets,
      expandedTargets,
      mutations: [setLastUsed, ...mutations],
    }
  }
  return {}
}
