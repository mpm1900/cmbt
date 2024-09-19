import { Smite, SmiteId } from '@repo/game/data'
import { DamageListInline } from '@shared/DamageListInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const SmiteRenderer: ActionRenderer = {
  name: ACTION_NAMES[SmiteId],
  description: (a, props) => {
    const action = a as Smite
    return (
      <>
        Deals <DamageListInline damages={action.damages} /> to target active
        enemy.
      </>
    )
  },
}
