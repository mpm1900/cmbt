import { MindBlast, MindBlastId } from '@repo/game/data'
import { DamageInline } from '@shared/DamageInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const MindBlastRenderer: ActionRenderer = {
  name: ACTION_NAMES[MindBlastId],
  description: (action, props) => {
    const mindblast = action as MindBlast
    return (
      <div>
        Deals <DamageInline damage={mindblast.damage} /> to all active enemy
        units.
      </div>
    )
  },
}
