import {
  Bane,
  EnragedParentId,
  ProvokeId,
  UpdateFlagParent,
} from '@repo/game/data'
import { ModifierInline } from '@shared/ModifierInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const ProvokeRenderer: ActionRenderer = {
  name: ACTION_NAMES[ProvokeId],
  description: (action, props) => {
    const bane = action as Bane
    return (
      <div>
        Applies{' '}
        <ModifierInline
          side={props?.side}
          modifier={
            new UpdateFlagParent({
              registryId: EnragedParentId,
              flagKey: 'isDamageLocked',
              value: true,
              duration: 1,
            })
          }
        />{' '}
        to target enemy unit.
      </div>
    )
  },
  failureLog: (result) => <>{ACTION_NAMES[ProvokeId]} failed.</>,
}
