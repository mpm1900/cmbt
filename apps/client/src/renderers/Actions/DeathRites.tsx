import { DeathRites, DeathRitesId, KillParentOnTurnEnd } from '@repo/game/data'
import { ModifierInline } from '@shared/ModifierInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const DeathRitesRenderer: ActionRenderer = {
  name: ACTION_NAMES[DeathRitesId],
  description: (action, props) => {
    const deathrites = action as DeathRites
    return (
      <div>
        Applies{' '}
        <ModifierInline
          side={props?.side}
          modifier={
            new KillParentOnTurnEnd({
              delay: deathrites.delay,
            })
          }
        />{' '}
        to target active enemy.
      </div>
    )
  },
}
