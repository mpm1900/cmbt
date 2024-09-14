import {
  DamageAllOnTurnEnd,
  Firestorm,
  FirestormId,
  FirestormOnTurnEndId,
} from '@repo/game/data'
import { ModifierInline } from '@shared/ModifierInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const FirestormRenderer: ActionRenderer = {
  name: ACTION_NAMES[FirestormId],
  description: (action) => {
    const sandstorm = action as Firestorm
    return (
      <div>
        Applies{' '}
        <ModifierInline
          modifier={
            new DamageAllOnTurnEnd({
              registryId: FirestormOnTurnEndId,
              factor: sandstorm.damageFactor,
              damageType: 'fire',
              duration: sandstorm.duration,
            })
          }
        />{' '}
        to the battlefield.
      </div>
    )
  },
}
