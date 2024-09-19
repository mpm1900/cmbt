import {
  Rest,
  RestId,
  SleepingParentId,
  UpdateFlagParent,
} from '@repo/game/data'
import { ModifierInline } from '@shared/ModifierInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const RestRenderer: ActionRenderer = {
  name: ACTION_NAMES[RestId],
  description: (a, props) => {
    const action = a as Rest
    return (
      <div>
        Removes all damage from this unit. Applies{' '}
        <ModifierInline
          side={props?.side}
          modifier={
            new UpdateFlagParent({
              registryId: SleepingParentId,
              flag: 'isStunned',
              value: true,
              duration: action.duration,
            })
          }
        />{' '}
        to this unit.
      </div>
    )
  },
}
