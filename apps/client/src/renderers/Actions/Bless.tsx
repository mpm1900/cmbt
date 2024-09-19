import {
  Bless,
  BlessedParentId,
  BlessId,
  UpdateFlagParent,
} from '@repo/game/data'
import { ModifierInline } from '@shared/ModifierInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const BlessRenderer: ActionRenderer = {
  name: ACTION_NAMES[BlessId],
  description: (action, props) => {
    const bless = action as Bless
    return (
      <div>
        Applies{' '}
        <ModifierInline
          side={props?.side}
          modifier={
            new UpdateFlagParent({
              registryId: BlessedParentId,
              flag: 'isBlessed',
              value: true,
              duration: 1,
            })
          }
        />{' '}
        to target active ally until end of turn.
      </div>
    )
  },
}
