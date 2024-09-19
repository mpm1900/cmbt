import {
  Protect,
  ProtectedParentId,
  ProtectId,
  UpdateFlagParent,
} from '@repo/game/data'
import { ModifierInline } from '@shared/ModifierInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const ProtectRenderer: ActionRenderer = {
  name: ACTION_NAMES[ProtectId],
  description: (a, props) => {
    const action = a as Protect
    return (
      <div>
        Applies{' '}
        <ModifierInline
          side={props?.side}
          modifier={
            new UpdateFlagParent({
              registryId: ProtectedParentId,
              flag: 'isProtected',
              value: true,
              duration: action.duration,
            })
          }
        />{' '}
        to this unit. Cannot be used twice in a row.
      </div>
    )
  },
  failureLog: (result) => <>{ACTION_NAMES[ProtectId]} failed.</>,
}
