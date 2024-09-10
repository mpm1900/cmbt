import { ThunderboltId } from '@repo/game/data'
import { DamageInline } from '@shared/DamageInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const ThunderboltRenderer: ActionRenderer = {
  name: ACTION_NAMES[ThunderboltId],
  description: (action, props) => {
    return (
      <div>
        Deals <DamageInline damage={action.damage} /> to target enemy unit.
      </div>
    )
  },
}
