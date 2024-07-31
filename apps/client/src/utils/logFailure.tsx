import { LogSecondary } from '@/components/ui/log'
import { ActionResult, GameContext } from '@repo/game/types'

export function logFailure(result: ActionResult, ctx: GameContext) {
  if (result.data && !result.data.accuracyRoll.success) {
    ctx.log(
      <LogSecondary>
        Miss! ({result.data.accuracyRoll.roll}, needed{' '}
        {result.data.accuracyRoll.threshold})
      </LogSecondary>
    )
  }
}
