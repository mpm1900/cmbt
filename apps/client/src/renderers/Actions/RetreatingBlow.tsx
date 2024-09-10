import { RetreatingBlowId } from '@repo/game/data'
import { DamageInline } from '@shared/DamageInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const RetreatingBlowRenderer: ActionRenderer = {
  name: ACTION_NAMES[RetreatingBlowId],
  description: (action, props) => {
    return (
      <div>
        Deals <DamageInline damage={action.damage} /> to target enemy unit. This
        unit switches out after attacking.
      </div>
    )
  },
}
