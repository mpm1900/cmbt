import { useCombatContext } from '@/hooks'
import { PropsWithClassname } from '@/types'
import { getUnitModifierRenderList } from '@/utils'
import { Unit } from '@repo/game/types'
import { UnitModifiers } from './UnitModifiers'

export type UnitCombatModifiersProps = {
  unit: Unit
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export function UnitCombatModifiers(
  props: PropsWithClassname<UnitCombatModifiersProps>
) {
  const ctx = useCombatContext()
  console.log('all', ctx.modifiers)
  const modifiers = getUnitModifierRenderList(props.unit, ctx)

  return (
    <UnitModifiers
      className={props.className}
      iconClassName="h-[24px] w-[24px]"
      side={props.side}
      modifiers={modifiers}
    />
  )
}
