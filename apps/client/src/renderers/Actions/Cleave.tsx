import { Cleave, CleaveId } from '@repo/game/data'
import { DamageListInline } from '@shared/DamageListInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const CleaveRenderer: ActionRenderer = {
  name: ACTION_NAMES[CleaveId],
  description: (a, props) => {
    const action = a as Cleave
    return (
      <>
        Deals <DamageListInline damages={action.damages} /> to all active
        enemies.
      </>
    )
  },
}
