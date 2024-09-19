import { HealingWord, HealingWordId } from '@repo/game/data'
import { ACTION_NAMES, ActionRenderer } from '.'

export const HealingWordRenderer: ActionRenderer = {
  name: ACTION_NAMES[HealingWordId],
  description: (a, props) => {
    const action = a as HealingWord
    return (
      <div>
        Heals target allied unit for up to {action.healthFactor * 100}% of their
        max health.
      </div>
    )
  },
}
