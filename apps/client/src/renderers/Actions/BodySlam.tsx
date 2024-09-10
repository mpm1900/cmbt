import { BodySlam, BodySlamId } from '@repo/game/data'
import { DamageInline } from '@shared/DamageInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const BodySlamRenderer: ActionRenderer = {
  name: ACTION_NAMES[BodySlamId],
  description: (action) => {
    const bodyslam = action as BodySlam
    return (
      <div>
        Deals <DamageInline damage={bodyslam.damage} /> to target enemey unit.
        If this attack misses, deals{' '}
        <DamageInline damage={bodyslam.missDamage} /> to this unit instead.
      </div>
    )
  },
}
