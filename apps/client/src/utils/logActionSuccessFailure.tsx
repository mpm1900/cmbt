import { LogSecondary, LogUnit } from '@/components/ui/log'
import { CombatLogger } from '@/hooks/state'
import { ActionRenderers } from '@/renderers'
import { ActionResult, CombatContext } from '@repo/game/types'

export function logActionSuccessFailure(
  result: ActionResult,
  log: CombatLogger,
  ctx: CombatContext
) {
  const renderer = ActionRenderers[result.action?.id || '']
  if (result.success && renderer?.successLog) {
    log(<LogSecondary>{renderer.successLog(result, ctx)}</LogSecondary>)
  }
  if (!result.success) {
    if (renderer?.failureLog) {
      log(<LogSecondary>{renderer.failureLog(result, ctx)}</LogSecondary>)
    }
    if (result.data?.source?.flags.isBaned) {
      log(
        <LogSecondary>
          <LogUnit unit={result.data.source} user={ctx.user}>
            {result.data.source.name}
          </LogUnit>{' '}
          is baned.
        </LogSecondary>
      )
    }
  }
}
