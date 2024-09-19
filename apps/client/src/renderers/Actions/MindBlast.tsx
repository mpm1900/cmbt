import { MindBlast, MindBlastId } from '@repo/game/data'
import { DamageListInline } from '@shared/DamageListInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const MindBlastRenderer: ActionRenderer = {
  name: ACTION_NAMES[MindBlastId],
  description: (action, props) => {
    const mindblast = action as MindBlast
    return (
      <div>
        Deals <DamageListInline damages={action.damages} /> to all active
        enemies.
      </div>
    )
  },
}
