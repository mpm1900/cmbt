import { PowerCleave, PowerCleaveId } from '@repo/game/data'
import { DamageInline } from '@shared/DamageInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const PowerCleaveRenderer: ActionRenderer = {
  name: ACTION_NAMES[PowerCleaveId],
  baseDamage: (a) => `${a.damage?.value}`,
  description: (action, props) => {
    const powercleave = action as PowerCleave
    return (
      <>
        Deals <DamageInline damage={powercleave.damage} /> to target enemy unit.
        High critical chance.
      </>
    )
  },
}
