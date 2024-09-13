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
    log(<LogSecondary>{renderer.successLog(result)}</LogSecondary>)
  }
  if (!result.success) {
    if (renderer?.failureLog) {
      log(<LogSecondary>{renderer.failureLog(result)}</LogSecondary>)
    }
    if (result.data?.source?.flags.isDisrupted) {
      log(
        <LogSecondary>
          <LogUnit unit={result.data.source} user={ctx.user}>
            {result.data.source.name}
          </LogUnit>{' '}
          is disrupted.
        </LogSecondary>
      )
    }
  }
}
