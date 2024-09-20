import { LayOnHands, LayOnHandsId } from '@repo/game/data'
import { ACTION_NAMES, ActionRenderer } from '.'

export const LayOnHandsRenderer: ActionRenderer = {
  name: ACTION_NAMES[LayOnHandsId],
  description: (a, props) => {
    const action = a as LayOnHands
    return (
      <>
        Removes all statuses from target ally. If target has no statuses, heals
        for {action.healthFactor * 100}% of their max health instead.
      </>
    )
  },
}
