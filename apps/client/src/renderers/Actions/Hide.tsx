import { HiddenParentId, Hide, HideId, UpdateFlagParent } from '@repo/game/data'
import { ModifierInline } from '@shared/ModifierInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const HideRenderer: ActionRenderer = {
  name: ACTION_NAMES[HideId],
  description: (a, props) => {
    const action = a as Hide
    return (
      <div>
        Applies{' '}
        <ModifierInline
          side={props?.side}
          modifier={
            new UpdateFlagParent({
              registryId: HiddenParentId,
              flagKey: 'isHidden',
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
