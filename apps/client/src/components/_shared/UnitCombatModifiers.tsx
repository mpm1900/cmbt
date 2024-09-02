import { useCombatContext } from '@/hooks'
import { PropsWithClassname } from '@/types'
import { getStatusesFromModifiers } from '@/utils/getStatusesFromModifiers'
import { Unit } from '@repo/game/types'
import { applyModifiers } from '@repo/game/utils'
import { UnitModifiers } from './UnitModifiers'

export type UnitCombatModifiersProps = {
  unit: Unit
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export function UnitCombatModifiers(
  props: PropsWithClassname<UnitCombatModifiersProps>
) {
  const ctx = useCombatContext()
  const { appliedModifiers, registeredTriggers } = applyModifiers(
    props.unit,
    ctx
  )
  const list = [...appliedModifiers, ...registeredTriggers]
  const nonStatusModifiers = list.filter((m) => !m.statusId)
  const statuses = getStatusesFromModifiers(list)
  return (
    <UnitModifiers
      className={props.className}
      side={props.side}
      modifiers={nonStatusModifiers}
      statuses={statuses}
    />
  )
}
