import { Hex, HexedParentId, HexId, UpdateFlagParent } from '@repo/game/data'
import { ModifierInline } from '@shared/ModifierInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const HexRenderer: ActionRenderer = {
  name: ACTION_NAMES[HexId],
  description: (action, props) => {
    const hex = action as Hex
    return (
      <div>
        Applies{' '}
        <ModifierInline
          side={props?.side}
          modifier={
            new UpdateFlagParent({
              registryId: HexedParentId,
              flagKey: 'isHexed',
              value: true,
              duration: 1,
            })
          }
        />{' '}
        to target enemy unit. Usable only on the first turn after switching in.
      </div>
    )
  },
  failureLog: (result) => <>{ACTION_NAMES[HexId]} failed.</>,
}
