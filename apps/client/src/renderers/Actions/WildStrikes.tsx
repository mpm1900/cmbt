import { WildStrikes, WildStrikesId } from '@repo/game/data'
import { DamageListInline } from '@shared/DamageListInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const WildStrikesRenderer: ActionRenderer = {
  name: ACTION_NAMES[WildStrikesId],
  description: (a, props) => {
    const action = a as WildStrikes
    return (
      <div>
        Deals <DamageListInline damages={action.damages} /> to target active
        enemy. Repeats {action.range.join('-')} times.
      </div>
    )
  },
}
