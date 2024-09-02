import { cn } from '@/lib/utils'
import { PropsWithClassname } from '@/types'
import { Modifier, Status } from '@repo/game/types'
import { ModifierIcon } from './ModifierIcon'
import { StatusIcon } from './StatusIcon'

export type UnitModifiersProps = PropsWithClassname<{
  modifiers: Modifier[]
  statuses: Status[]
  side?: 'top' | 'right' | 'bottom' | 'left'
}>

export function UnitModifiers(props: UnitModifiersProps) {
  const { modifiers, statuses } = props

  return (
    <div className={cn('px-3 space-x-2 flex flex-row', props.className)}>
      {modifiers.map((m) => {
        return (
          <ModifierIcon
            key={m.rtid}
            modifier={m}
            side={props.side}
            fallback={null}
          />
        )
      })}
      {statuses.map((s) => {
        return (
          <StatusIcon key={s.id} status={s} side={props.side} fallback={null} />
        )
      })}
    </div>
  )
}
