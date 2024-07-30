import { Action, ActionResult, Unit } from '../types'
import { ActionRenderData } from './getActionData'

export type ParseActionResult = Omit<
  ActionResult,
  'source' | 'targets' | 'data' | 'action'
>

export function parseSuccess(
  action: Action,
  data: ActionRenderData,
  source: Unit,
  targets: Unit[],
  config: {
    onSuccess: ParseActionResult
    onFailure: ParseActionResult
  }
): ActionResult {
  const { accuracyRoll, setLastUsed } = data
  const { onSuccess, onFailure } = config
  if (accuracyRoll.success) {
    return {
      ...onSuccess,
      action,
      data,
      source,
      targets,
      mutations: [setLastUsed, ...(onSuccess.mutations ?? [])],
    }
  } else {
    return {
      ...onFailure,
      action,
      data,
      source,
      targets,
      mutations: [setLastUsed, ...(onFailure.mutations ?? [])],
    }
  }
}
