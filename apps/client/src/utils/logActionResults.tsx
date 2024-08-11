import { LogSecondary } from '@/components/ui/log'
import { ActionRenderers } from '@/renderers'
import { ActionResult, CombatContext } from '@repo/game/types'

export function logActionResults(result: ActionResult, ctx: CombatContext) {
  const renderer = ActionRenderers[result.action?.id || '']
  if (result.success && renderer?.successLog) {
    ctx.log(<LogSecondary>{renderer.successLog(result)}</LogSecondary>)
  }
  if (!result.success && renderer?.failureLog) {
    ctx.log(<LogSecondary>{renderer.failureLog(result)}</LogSecondary>)
  }
}
