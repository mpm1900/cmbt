import { ActionRenderers } from '@/renderers'
import {
  ActionRenderResult,
  ActionsQueueItem,
  GameContext,
  Unit,
} from '@repo/game/types'
import { logActionResult } from './logActionResult'

export function getResultFromActionItem(
  item: ActionsQueueItem,
  ctx: GameContext
): ActionRenderResult {
  const { action, targetIds } = item
  const targets = ctx.units.filter((u) => targetIds.includes(u.id))
  const source = ctx.units.find((u) => u.id === action.sourceId) as Unit

  const result = action.resolve(source, targets, ctx)
  logActionResult(action, result, ctx)
  return result
}
