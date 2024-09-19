import { BodySlam, BodySlamId } from '@repo/game/data'
import { DamageInline } from '@shared/DamageInline'
import { DamageListInline } from '@shared/DamageListInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const BodySlamRenderer: ActionRenderer = {
  name: ACTION_NAMES[BodySlamId],
  description: (a) => {
    const action = a as BodySlam
    return (
      <div>
        Deals <DamageListInline damages={action.damages} /> to target active
        enemey. If this attack misses, deals{' '}
        <DamageInline damage={action.missDamage} /> to this unit instead. High
        critical ratio.
      </div>
    )
  },
}
