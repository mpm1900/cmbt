import { LogActionName, LogUnit } from '@/components/ui/log'
import { CombatLogger } from '@/hooks/state'
import { ActionRenderers } from '@/renderers'
import { Action, ActionResult, CombatContext } from '@repo/game/types'
import { TextList } from '@shared/TextList'

export function logActionIntent(
  action: Action,
  result: ActionResult,
  log: CombatLogger,
  ctx: CombatContext
) {
  const { source, targets, expandedTargets = [] } = result
  const logTargets = expandedTargets.length === 0 ? targets : expandedTargets
  const renderer = ActionRenderers[action.id]
  if (logTargets) {
    const baseLog = (
      <span className="">
        <LogUnit unit={source!} user={ctx.user}>
          {source?.name}
        </LogUnit>
        {' used '}
        <LogActionName action={action} />
        {logTargets.length > 0 && (
          <span>
            {' on '}
            <TextList>
              {logTargets.map((t) => (
                <LogUnit key={t.id} unit={t} user={ctx.user}>
                  {t.name}
                </LogUnit>
              ))}
            </TextList>
          </span>
        )}
      </span>
    )
    log(renderer?.log ? renderer.log(action, source, logTargets, ctx) : baseLog)
  }
}
