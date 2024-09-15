import { cn } from '@/lib/utils'
import { ModifierRenderers } from '@/renderers'
import { PropsWithClassname } from '@/types'
import { getStatusesFromModifiers } from '@/utils/getStatusesFromModifiers'
import { InspectedAllId, UpdateStatStageParent } from '@repo/game/data'
import { Modifier } from '@repo/game/types'
import { combineStageModifiers, mapStageToMultiplier } from '@repo/game/utils'
import { Badge } from '../ui/badge'
import { ModifierIcon } from './ModifierIcon'
import { StatusIcon } from './StatusIcon'

export type UnitModifiersProps = PropsWithClassname<{
  modifiers: Modifier[]
  side?: 'top' | 'right' | 'bottom' | 'left'
  iconClassName?: string
}>

export function UnitModifiers(props: UnitModifiersProps) {
  const { modifiers, iconClassName } = props

  const nonStatusModifiers = combineStageModifiers(
    modifiers.filter((m) => !m.statusId && m.id !== InspectedAllId)
  )
  const statuses = getStatusesFromModifiers(modifiers)

  return (
    <div
      className={cn('px-2 space-x-2 flex flex-row h-[28px]', props.className)}
    >
      {nonStatusModifiers.map((m) => {
        const r = ModifierRenderers[m.registryId]
        return (
          <div key={m.rtid} className="flex items-center space-x-0.5">
            <ModifierIcon
              modifier={m}
              side={props.side}
              fallback={r?.name(m) ?? m.id}
              className={iconClassName}
            />
            {m instanceof UpdateStatStageParent && (
              <Badge className="p-0.5 py-0">
                ×{mapStageToMultiplier(m.stages).toFixed(2)}
              </Badge>
            )}
          </div>
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
