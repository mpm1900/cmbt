import { MagicMissile, MagicMissileId } from '@repo/game/data'
import { DamageListInline } from '@shared/DamageListInline'
import { ActionRenderer } from '.'
import { ACTION_NAMES } from './_names'

export const MagicMissileRenderer: ActionRenderer = {
  name: ACTION_NAMES[MagicMissileId],
  description: (a, props) => {
    const action = a as MagicMissile
    return (
      <>
        Deals <DamageListInline damages={action.damages} /> to{' '}
        {action.maxTargetCount} target active enemies. This action cannot miss.
      </>
    )
  },
}
