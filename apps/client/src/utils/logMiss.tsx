import { LogSecondary } from '@/components/ui/log'
import { ActionResult, CombatContext } from '@repo/game/types'

export function logMiss(result: ActionResult, ctx: CombatContext) {
  if (result.data && !result.data.accuracyRoll.success) {
    ctx.log(
      <LogSecondary>
        Miss! ({result.data.accuracyRoll.roll}, needed{' '}
        {result.data.accuracyRoll.threshold})
      </LogSecondary>
    )
  }
}
