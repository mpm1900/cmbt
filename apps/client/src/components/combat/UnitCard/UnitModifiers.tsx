import { ModifierRenderers } from '@/renderers'
import { ModifierIcon } from '../ModifierIcon'
import { applyModifiers } from '@repo/game/utils'
import { useCombatContext } from '@/hooks'
import { Unit } from '@repo/game/types'
import { PropsWithClassname } from '@/types'
import { cn } from '@/lib/utils'

export type UnitModifiersProps = {
  unit: Unit
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
            fallback={
              <span key={m.rtid} className="font-bold">
                {r?.Inline ? <r.Inline /> : `${r?.name ?? m.id}`}
              </span>
            }
          />
        )
      })}
    </div>
  )
}
