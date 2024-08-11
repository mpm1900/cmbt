import { LogSecondary } from '@/components/ui/log'
import { ActionResult, CombatContext } from '@repo/game/types'

export function logCritical(result: ActionResult, ctx: CombatContext) {
  if (
    result.data &&
    result.data.accuracyRoll.success &&
    result.data.accuracyRoll.criticalSuccess
  ) {
    ctx.log(
      <LogSecondary>
        <span className="text-yellow-300">Critical Hit!</span>{' '}
        <span className="text-green-300/80">
          x{result.data.accuracyRoll.criticalFactor}
        </span>{' '}
        <span className="text-sm text-muted-foreground/50">
          ({result.data.accuracyRoll.roll}, needed{' '}
          {result.data.accuracyRoll.criticalThreshold} or lower)
        </span>
      </LogSecondary>
    )
  }
}
