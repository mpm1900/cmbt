import { useCombatContext } from '@/hooks'
import { cn } from '@/lib/utils'
import { ModifierRenderers } from '@/renderers'
import { PropsWithClassname } from '@/types'
import { Unit } from '@repo/game/types'
import { applyModifiers } from '@repo/game/utils'
import { ModifierIcon } from '../../_shared/ModifierIcon'

export type UnitModifiersProps = {
  unit: Unit
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export function UnitModifiers(props: PropsWithClassname<UnitModifiersProps>) {
  const ctx = useCombatContext()
  const { appliedModifiers, registeredTriggers } = applyModifiers(
    props.unit,
    ctx
  )
  return (
    <div
      className={cn('px-3 space-x-2 flex flex-row h-[28px]', props.className)}
    >
      {[...appliedModifiers, ...registeredTriggers].map((m) => {
        const r = ModifierRenderers[m.rid]
        return (
          <ModifierIcon
            key={m.rtid}
            modifier={m}
            side={props.side}
            fallback={
              <span key={m.rtid} className="font-bold">
                {`${r?.name ?? m.id}`}
              </span>
            }
          />
        )
      })}
    </div>
  )
}
