import { Burn, InfernalBlast, InfernalBlastId } from '@repo/game/data'
import { DamageInline } from '@shared/DamageInline'
import { StatusInline } from '@shared/StatusInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const InfernalBlastRenderer: ActionRenderer = {
  name: ACTION_NAMES[InfernalBlastId],
  description: (action, props) => {
    const fireblast = action as InfernalBlast
    return (
      <div>
        Deals <DamageInline damage={action.damage} /> to target enemy unit.{' '}
        {fireblast.burnChance}% chance to apply{' '}
        <StatusInline status={Burn} side={props?.side} />.
      </div>
    )
  },
}
