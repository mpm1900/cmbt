import { LogUnit } from '@/components/ui/log'
import { ModifierRenderers } from '@/renderers'
import { CombatContext, Trigger, TriggerEvent } from '@repo/game/types'

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
      const renderer = ModifierRenderers[trigger.rid]
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
          <span className="text-white">{renderer?.name}</span> Trigger
        </div>
      )
    })
  }
}
