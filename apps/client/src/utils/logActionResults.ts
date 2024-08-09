import { ActionRenderers } from '@/renderers'
import { ActionResult, CombatContext } from '@repo/game/types'

export function logActionResults(result: ActionResult, ctx: CombatContext) {
  const renderer = ActionRenderers[result.action?.id || '']
  if (result.success && renderer?.successLog) {
    ctx.log(renderer.successLog(result))
  }
  if (!result.success && renderer?.failureLog) {
    ctx.log(renderer.failureLog(result))
  }
}
