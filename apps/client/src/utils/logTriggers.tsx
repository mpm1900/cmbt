import { LogTriggerName, LogUnit } from '@/components/ui/log'
import { CombatLogger } from '@/hooks/state'
import {
  CombatContext,
  MutationFilterArgs,
  Trigger,
  TriggerEvent,
} from '@repo/game/types'
import { ModifierInline } from '@shared/ModifierInline'

export function logTriggers(
  triggers: Trigger[],
  event: TriggerEvent,
  log: CombatLogger,
  ctx: CombatContext,
  args: MutationFilterArgs
) {
  triggers = triggers.filter((trigger) => {
    const parent = ctx.units.find((u) => u.id === trigger.parentId)
    const shouldLog = !parent || trigger.filter(parent, ctx, args)
    return shouldLog
  })

  if (triggers.length > 0) {
    log(<LogTriggerName>{event}</LogTriggerName>)

    triggers
      .filter((t) => (t.delay ?? 0) <= 0)
      .forEach((trigger) => {
        const parent = ctx.units.find((u) => u.id === trigger.parentId)
        log(
          <div className="text-muted-foreground">
            {parent && (
              <LogUnit
                unit={parent}
                user={ctx.user}
                className="opacity-70 font-normal"
              >
                {parent.name}'s{' '}
              </LogUnit>
            )}
            <ModifierInline
              side="left"
              className="font-normal text-white"
              modifier={trigger}
            />{' '}
            Trigger
          </div>
        )
      })
  }
}
