import { LogSecondary, LogUnit } from '@/components/ui/log'
import { ModifierRenderers } from '@/renderers'
import { Separator } from '@radix-ui/react-separator'
import { CombatContext, Trigger, TriggerEvent, Unit } from '@repo/game/types'

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
      const source = ctx.units.find((u) => u.id === trigger.sourceId) as Unit
      const renderer = ModifierRenderers[trigger.rid]
      ctx.log(
        <div className="text-muted-foreground">
          <LogUnit
            teamId={source.teamId}
            user={ctx.user}
            className="opacity-70 font-normal"
          >
            {source.name}'s
          </LogUnit>{' '}
          <span className="text-white">{renderer?.name}</span> Trigger
        </div>
      )
    })
  }
}
