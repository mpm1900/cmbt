import { PowerCleave, PowerCleaveId } from '@repo/game/data'
import { DamageListInline } from '@shared/DamageListInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const PowerCleaveRenderer: ActionRenderer = {
  name: ACTION_NAMES[PowerCleaveId],
  description: (action, props) => {
    const powercleave = action as PowerCleave
    return (
      <>
        Deals <DamageListInline damages={action.damages} /> to target enemy
        unit. High critical chance.
      </>
    )
  },
}
