import { useCombatContext } from '@/hooks'
import { PropsWithClassname } from '@/types'
import { Trigger, Unit } from '@repo/game/types'
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
  const otherTriggers = ctx.modifiers.filter(
    (m) =>
      m instanceof Trigger &&
      m.parentId === props.unit.id &&
      !registeredTriggers.some((t) => t.rtid === m.rtid)
  )
  const list = [...appliedModifiers, ...registeredTriggers, ...otherTriggers]
  return (
    <UnitModifiers
      className={props.className}
      iconClassName="h-[24px] w-[24px]"
      side={props.side}
      modifiers={list}
    />
  )
}
