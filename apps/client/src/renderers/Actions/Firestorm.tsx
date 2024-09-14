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
  description: (a) => {
    const action = a as Firestorm
    return (
      <div>
        Applies{' '}
        <ModifierInline
          modifier={
            new DamageAllOnTurnEnd({
              registryId: FirestormOnTurnEndId,
              duration: action.duration,
              damage: {
                factor: action.damageFactor,
                attackType: 'magic',
                damageType: 'fire',
              },
            })
          }
        />{' '}
        to the battlefield.
      </div>
    )
  },
}
