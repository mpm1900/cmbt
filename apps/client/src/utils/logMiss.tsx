import { LogSecondary } from '@/components/ui/log'
import { CombatLogger } from '@/hooks/state'
import { ActionResult, CombatContext } from '@repo/game/types'

export function logMiss(
  result: ActionResult,
  log: CombatLogger,
  ctx: CombatContext
) {
  if (result.data && !result.data.accuracyRoll.success) {
    log(
      <LogSecondary>
        Miss!{' '}
        <span className="text-sm text-muted-foreground/50">
          ({result.data.accuracyRoll.roll}, needed{' '}
          {result.data.accuracyRoll.threshold} or lower)
        </span>
      </LogSecondary>
    )
  }
}
