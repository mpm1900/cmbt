import { useCombatContext } from '@/hooks'
import { cn } from '@/lib/utils'
import { ModifierRenderers, StatusRenderers } from '@/renderers'
import { PropsWithClassname } from '@/types'
import { getStatusesFromModifiers } from '@/utils/getStatusesFromModifiers'
import { Unit } from '@repo/game/types'
import { applyModifiers } from '@repo/game/utils'
import { StatusIcon } from '@shared/StatusIcon'
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
  const list = [...appliedModifiers, ...registeredTriggers]
  const nonStatusModifiers = list.filter((m) => !m.statusId)
  const statuses = getStatusesFromModifiers(list)
  return (
    <div
      className={cn('px-3 space-x-2 flex flex-row h-[28px]', props.className)}
    >
      {nonStatusModifiers.map((m) => {
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
      {statuses.map((s) => {
        const r = StatusRenderers[s.id]
        return (
          <StatusIcon
            key={s.id}
            status={s}
            side={props.side}
            fallback={
              <span key={s.id} className="font-bold">
                {`${r?.name ?? s.id}`}
              </span>
            }
          />
        )
      })}
    </div>
  )
}
