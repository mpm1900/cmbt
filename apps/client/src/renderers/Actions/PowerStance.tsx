import { AddActionParent, PowerStance, PowerStanceId } from '@repo/game/data'
import { ModifierInline } from '@shared/ModifierInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const PowerStanceRenderer: ActionRenderer = {
  name: ACTION_NAMES[PowerStanceId],
  description: (action, props) => {
    const powerstance = action as PowerStance
    return (
      <>
        Applies{' '}
        <ModifierInline
          side={props?.side}
          modifier={
            new AddActionParent({
              registryId: PowerStanceId,
              action: (u) => powerstance.action(u),
            })
          }
        />{' '}
        to this unit.
      </>
    )
  },
}
