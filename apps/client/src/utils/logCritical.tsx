import { LogSecondary } from '@/components/ui/log'
import { ActionResult, CombatContext } from '@repo/game/types'

export function logCritical(result: ActionResult, ctx: CombatContext) {
  console.log(result)
  if (
    result.data &&
    result.data.accuracyRoll.success &&
    result.data.accuracyRoll.criticalSuccess
  ) {
    ctx.log(
      <LogSecondary>
        Critical Hit! (x{result.data.accuracyRoll.criticalFactor},{' '}
        {result.data.accuracyRoll.roll}, needed{' '}
        {result.data.accuracyRoll.criticalThreshold})
      </LogSecondary>
    )
  }
}
