import { ActionRenderResult, Unit } from '../types'
import { ActionRenderData } from './getActionData'

export type ParseActionResult = Omit<
  ActionRenderResult,
  'source' | 'targets' | 'data'
>

export function parseSuccess(
  data: ActionRenderData,
  source: Unit,
  targets: Unit[],
  config: {
    onSuccess: ParseActionResult
    onFailure: ParseActionResult
  }
): ActionRenderResult {
  const { accuracyRoll, setLastUsed } = data
  const { onSuccess, onFailure } = config
  if (accuracyRoll.success) {
    return {
      ...onSuccess,
      data,
      source,
      targets,
      mutations: [setLastUsed, ...(onSuccess.mutations ?? [])],
    }
  } else {
    return {
      ...onFailure,
      data,
      source,
      targets,
      mutations: [setLastUsed, ...(onFailure.mutations ?? [])],
    }
  }
}
