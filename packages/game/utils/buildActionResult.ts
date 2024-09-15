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
    forceSuccess?: boolean
    shouldLog?: boolean
    onSuccess?: ParseActionResult
    onFailure?: ParseActionResult
    expandedTargets?: Unit[]
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
    forceSuccess,
    shouldLog = true,
    onSuccess = {},
    onFailure = {},
    expandedTargets: targetsOverride,
  } = config(expandedTargets)

  const success =
    forceSuccess ||
    data.source.flags.isBlessed ||
    (accuracyRoll.success &&
      !forceFailure &&
      !data.source.flags.isBaned &&
      action.filter(data.source, ctx))

  if (success) {
    const { mutations = [], ...rest } = onSuccess
    return {
      ...rest,
      shouldLog,
      success: true,
      action,
      data,
      source,
      targets,
      expandedTargets: targetsOverride ?? expandedTargets,
      protectedTargets,
      mutations: [setLastUsed, ...mutations],
    }
  }
  if (!success) {
    const { mutations = [], ...rest } = onFailure
    return {
      ...rest,
      shouldLog,
      success: false,
      action,
      data,
      source,
      targets,
      expandedTargets: targetsOverride ?? expandedTargets,
      protectedTargets,
      mutations: [setLastUsed, ...mutations],
    }
  }
  return {}
}
