import { LogUnit } from '@/components/ui/log'
import { CombatContext, Trigger, TriggerEvent } from '@repo/game/types'
import { ModifierInline } from '@shared/ModifierInline'

export function logTriggers(
  triggers: Trigger[],
  event: TriggerEvent,
  ctx: CombatContext
) {
  if (triggers.length > 0) {
    ctx.log(
      <div className="flex flex-row items-center space-x-2 text-muted-foreground/40 uppercase">
        {event}
      </div>
    )

    triggers.forEach((trigger) => {
      const parent = ctx.units.find((u) => u.id === trigger.parentId)
      ctx.log(
        <div className="text-muted-foreground">
          {parent && (
            <LogUnit
              teamId={parent.teamId}
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
