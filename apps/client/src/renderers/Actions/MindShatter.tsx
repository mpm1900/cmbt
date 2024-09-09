import { MindShatterId } from '@repo/game/data'
import { DamageInline } from '@shared/DamageInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const MindShatterRenderer: ActionRenderer = {
  name: ACTION_NAMES[MindShatterId],
  baseDamage: (action) => `${action.damage?.power}`,
  description: (action, props) => {
    return (
      <div>
        Deals <DamageInline damage={action.damage} /> to target enemy unit.
      </div>
    )
  },
}
