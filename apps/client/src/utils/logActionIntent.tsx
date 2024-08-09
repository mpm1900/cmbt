import { LogActionName, LogUnit } from '@/components/ui/log'
import { ActionRenderers } from '@/renderers'
import { Action, ActionResult, CombatContext } from '@repo/game/types'

export function logActionIntent(
  action: Action,
  result: ActionResult,
  ctx: CombatContext
) {
  const { source, targets } = result
  const renderer = ActionRenderers[action.id]
  if (targets) {
    const baseLog = (
      <span className="">
        <LogUnit teamId={source?.teamId} user={ctx.user} className="font-bold">
          {source?.name}
        </LogUnit>{' '}
        uses <LogActionName action={action} />
      </span>
    )
    ctx.log(
      renderer?.log ? renderer.log(action, source, targets, ctx) : baseLog
    )
  }
}
