import {
  Bane,
  BaneId,
  DisruptedParentId,
  UpdateFlagParent,
} from '@repo/game/data'
import { ModifierInline } from '@shared/ModifierInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const BaneRenderer: ActionRenderer = {
  name: ACTION_NAMES[BaneId],
  description: (action, props) => {
    const hex = action as Bane
    return (
      <div>
        Applies{' '}
        <ModifierInline
          side={props?.side}
          modifier={
            new UpdateFlagParent({
              registryId: DisruptedParentId,
              flagKey: 'isDisrupted',
              value: true,
              duration: 1,
            })
          }
        />{' '}
        to target enemy unit. Usable only on the first turn after switching in.
      </div>
    )
  },
  failureLog: (result) => <>{ACTION_NAMES[BaneId]} failed.</>,
}
