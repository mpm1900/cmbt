import { SearingLight, SearingLightId } from '@repo/game/data'
import { DamageInline } from '@shared/DamageInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const SearingLightRenderer: ActionRenderer = {
  name: ACTION_NAMES[SearingLightId],
  description: (a, props) => {
    const action = a as SearingLight
    return (
      <div>
        Deals <DamageInline damage={action.damage} /> to target unit, if target
        is an enemy. Heals for up to {action.healthFactor * 100}% of their max
        health if target is an ally.
      </div>
    )
  },
}
