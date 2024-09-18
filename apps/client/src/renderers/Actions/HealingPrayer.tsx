import { HealingPrayer, HealingPrayerId } from '@repo/game/data'
import { ACTION_NAMES, ActionRenderer } from '.'

export const HealingPrayerRenderer: ActionRenderer = {
  name: ACTION_NAMES[HealingPrayerId],
  description: (a, props) => {
    const action = a as HealingPrayer
    return (
      <>
        Heals target allied unit for up to {action.healingFactor * 100}% of
        their max health at the end of the next turn.
      </>
    )
  },
}
