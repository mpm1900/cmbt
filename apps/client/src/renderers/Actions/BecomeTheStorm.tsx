import {
  BecomeTheStorm,
  BecomeTheStormId,
  StunnedParentId,
  UpdateFlagParent,
} from '@repo/game/data'
import { DamageListInline } from '@shared/DamageListInline'
import { ModifierInline } from '@shared/ModifierInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const BecomeTheStormRenderer: ActionRenderer = {
  name: ACTION_NAMES[BecomeTheStormId],
  description: (a, props) => {
    const action = a as BecomeTheStorm
    return (
      <div>
        Deals <DamageListInline damages={action.damages} /> to target enemy
        unit. Applies{' '}
        <ModifierInline
          side={props?.side}
          modifier={
            new UpdateFlagParent({
              registryId: StunnedParentId,
              flag: 'isStunned',
              value: true,
              duration: action.stunDuration,
            })
          }
        />{' '}
        to this unit.
      </div>
    )
  },
}
