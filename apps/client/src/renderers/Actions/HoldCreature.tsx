import {
  HoldCreatureId,
  StunnedParentId,
  UpdateFlagParent,
} from '@repo/game/data'
import { ModifierInline } from '@shared/ModifierInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const HoldCreatureRenderer: ActionRenderer = {
  name: ACTION_NAMES[HoldCreatureId],
  description: (action, props) => {
    return (
      <div>
        Applies{' '}
        <ModifierInline
          side={props?.side}
          modifier={
            new UpdateFlagParent({
              registryId: StunnedParentId,
              flag: 'isStunned',
              value: true,
            })
          }
        />{' '}
        to target active enemy for 1-3 turns.
      </div>
    )
  },
}
