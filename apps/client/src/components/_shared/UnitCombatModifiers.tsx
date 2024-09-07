import { useCombatContext } from '@/hooks'
import { PropsWithClassname } from '@/types'
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
  return (
    <UnitModifiers
      className={props.className}
      side={props.side}
      modifiers={list}
    />
  )
}
