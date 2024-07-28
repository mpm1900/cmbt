import { ActionRenderers } from '@/renderers'
import {
  ActionRenderResult,
  ActionsQueueItem,
  GameContext,
  Unit,
} from '@repo/game/types'

export function getResultFromActionItem(
  item: ActionsQueueItem,
  context: GameContext
): ActionRenderResult {
  const { action, targetIds } = item
  const targets = context.units.filter((u) => targetIds.includes(u.id))
  const source = context.units.find((u) => u.id === action.sourceId) as Unit

  const renderer = ActionRenderers[action.id]

  const baseLog = `${source.name} uses ${renderer?.name}`
  context.log(renderer?.log ? renderer.log(action, source, targets) : baseLog)

  const result = action.resolve(source, targets, context)
  if (result.data && !result.data.accuracyRoll.success) {
    context.log(
      `${renderer?.name} Missed! (${result.data.accuracyRoll.threshold} > ${result.data.accuracyRoll.roll} = false)`
    )
  }

  return result
}
