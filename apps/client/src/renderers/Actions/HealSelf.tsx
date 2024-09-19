import { HealSelf, HealSelfId } from '@repo/game/data'
import { ACTION_NAMES, ActionRenderer } from '.'

export const HealSelfRenderer: ActionRenderer = {
  name: ACTION_NAMES[HealSelfId],
  description: (a, props) => {
    const action = a as HealSelf
    return (
      <div>
        Heals this unit for up to {action.healthFactor * 100}% of their max
        health.
      </div>
    )
  },
}
