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
  const {
    source,
    targets,
    expandedTargets = [],
    protectedTargets = [],
  } = result
  const resultTargets = [...expandedTargets, ...protectedTargets]
  const logTargets = resultTargets.length === 0 ? targets : resultTargets
  const renderer = ActionRenderers[action.id]
  if (logTargets) {
    const baseLog = (
      <span className="text-muted-foreground">
        <LogUnit unit={source!} user={ctx.user}>
          {source?.name}
        </LogUnit>
        {' used '}
        <LogActionName action={action} />
        {logTargets.length > 0 && (
          <span>
            {' on '}
            <TextList>
              {logTargets.map((t, i) => (
                <LogUnit key={t.id + i} unit={t} user={ctx.user}>
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
