import { VampiricTouch, VampiricTouchId } from '@repo/game/data'
import { DamageListInline } from '@shared/DamageListInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const VampiricTouchRenderer: ActionRenderer = {
  name: ACTION_NAMES[VampiricTouchId],
  description: (a, props) => {
    const action = a as VampiricTouch
    return (
      <div>
        Deals <DamageListInline damages={action.damages} /> to target active
        enemy. This unit heals for up to {(action.drainFactor * 100).toFixed()}%
        of damage dealt.
      </div>
    )
  },
}
