import { Burn, InfernalBlast, InfernalBlastId } from '@repo/game/data'
import { DamageListInline } from '@shared/DamageListInline'
import { StatusInline } from '@shared/StatusInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const InfernalBlastRenderer: ActionRenderer = {
  name: ACTION_NAMES[InfernalBlastId],
  description: (action, props) => {
    const fireblast = action as InfernalBlast
    return (
      <div>
        Deals <DamageListInline damages={action.damages} /> to target enemy
        unit. {fireblast.burnChance}% chance to apply{' '}
        <StatusInline status={Burn} side={props?.side} />.
      </div>
    )
  },
}
