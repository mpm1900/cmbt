import { DamageNewUnitsOnUnitEnter, Spikes, SpikesId } from '@repo/game/data'
import { ModifierInline } from '@shared/ModifierInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const SpikesRenderer: ActionRenderer = {
  name: ACTION_NAMES[SpikesId],
  description: (a, props) => {
    const action = a as Spikes
    return (
      <div>
        Applies{' '}
        <ModifierInline
          side={props?.side}
          modifier={
            new DamageNewUnitsOnUnitEnter({
              maxInstances: 3,
              damage: action.spikeDamage,
            })
          }
        />{' '}
        to the battlefield.
      </div>
    )
  },
  successLog: () => (
    <span className="text-muted-foreground">
      Spikes were put onto the battle!
    </span>
  ),
}
