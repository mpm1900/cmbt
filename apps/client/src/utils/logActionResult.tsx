import { LogActionName, LogSecondary, LogUnit } from '@/components/ui/log'
import { cn } from '@/lib/utils'
import { ActionRenderers } from '@/renderers'
import { Unit } from '@faker-js/faker'
import { Action, ActionRenderResult, GameContext } from '@repo/game/types'

export function logActionResult(
  action: Action,
  result: ActionRenderResult,
  ctx: GameContext
) {
  const { source, targets } = result
  const renderer = ActionRenderers[action.id]
  if (source && targets) {
    const baseLog = (
      <span className="">
        <LogUnit teamId={source.teamId} user={ctx.user} className="font-bold">
          {source.name}
        </LogUnit>{' '}
        uses <LogActionName action={action} />
      </span>
    )
    ctx.log(
      renderer?.log ? renderer.log(action, source, targets, ctx) : baseLog
    )
    if (result.data && !result.data.accuracyRoll.success) {
      ctx.log(
        <LogSecondary>
          {renderer?.name} Missed! ({result.data.accuracyRoll.roll}, needed{' '}
          {result.data.accuracyRoll.threshold})
        </LogSecondary>
      )
    }
  }
}
