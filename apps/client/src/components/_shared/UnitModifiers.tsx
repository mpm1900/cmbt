import { cn } from '@/lib/utils'
import { PropsWithClassname } from '@/types'
import { getStatusesFromModifiers } from '@/utils/getStatusesFromModifiers'
import { Modifier } from '@repo/game/types'
import { ModifierIcon } from './ModifierIcon'
import { StatusIcon } from './StatusIcon'

export type UnitModifiersProps = PropsWithClassname<{
  modifiers: Modifier[]
  side?: 'top' | 'right' | 'bottom' | 'left'
  iconClassName?: string
}>

export function UnitModifiers(props: UnitModifiersProps) {
  const { modifiers, iconClassName } = props
  const nonStatusModifiers = modifiers.filter((m) => !m.statusId)
  const statuses = getStatusesFromModifiers(modifiers)

  return (
    <div
      className={cn('px-3 space-x-2 flex flex-row h-[28px]', props.className)}
    >
      {nonStatusModifiers.map((m) => {
        return (
          <ModifierIcon
            key={m.rtid}
            modifier={m}
            side={props.side}
            fallback={null}
            className={iconClassName}
          />
        )
      })}
      {statuses.map((s) => {
        return (
          <StatusIcon
            key={s.id}
            status={s}
            side={props.side}
            fallback={null}
            className={iconClassName}
          />
        )
      })}
    </div>
  )
}
