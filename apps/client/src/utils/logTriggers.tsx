import { LogUnit } from '@/components/ui/log'
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
        <span className="opacity-60">
          <LogUnit teamId={source.teamId} user={ctx.user}>
            {source.name}'s
          </LogUnit>{' '}
          {renderer?.name} Trigger
        </span>
      )
    })
  }
}
