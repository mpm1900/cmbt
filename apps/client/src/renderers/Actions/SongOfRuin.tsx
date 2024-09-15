import { SongOfRuin, SongOfRuinId } from '@repo/game/data'
import { DamageListInline } from '@shared/DamageListInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const SongOfRuinRenderer: ActionRenderer = {
  name: ACTION_NAMES[SongOfRuinId],
  description: (a, props) => {
    const action = a as SongOfRuin
    return (
      <div>
        Deals <DamageListInline damages={action.damages} /> to target enemy unit
        equal to 50% their remaining Heath.
      </div>
    )
  },
}
