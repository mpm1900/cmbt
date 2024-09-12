import {
  Action,
  ActionResolveData,
  ActionResult,
  CombatContext,
  Modifier,
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
    shouldLog?: boolean
    onSuccess?: ParseActionResult
    onFailure?: ParseActionResult
  }
): ActionResult {
  const { accuracyRoll, setLastUsed } = data
  const modifierFilter = (mod: Modifier) => !accuracyRoll.criticalSuccess
  const modifiedTargets = targets.map(
    (target) => applyModifiers(target, ctx, undefined, modifierFilter).unit
  )

  const baseTargets = action.mapTargets(modifiedTargets, ctx)
  const protectedTargets = baseTargets.filter(
    (target) => target.flags.isProtected
  )
  const expandedTargets = baseTargets.filter(
    (target) => !target.flags.isProtected
  )

  const {
    forceFailure,
    shouldLog = true,
    onSuccess = {},
    onFailure = {},
  } = config(expandedTargets)

  if (accuracyRoll.success && !forceFailure && !data.source.flags.isHexed) {
    const { mutations = [], ...rest } = onSuccess
    return {
      ...rest,
      shouldLog,
      success: true,
      action,
      data,
      source,
      targets,
      expandedTargets,
      protectedTargets,
      mutations: [setLastUsed, ...mutations],
    }
  }
  if (!accuracyRoll.success || forceFailure || data.source.flags.isHexed) {
    const { mutations = [], ...rest } = onFailure
    return {
      ...rest,
      shouldLog,
      success: false,
      action,
      data,
      source,
      targets,
      expandedTargets,
      protectedTargets,
      mutations: [setLastUsed, ...mutations],
    }
  }
  return {}
}
