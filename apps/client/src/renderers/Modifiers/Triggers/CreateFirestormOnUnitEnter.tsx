import {
  CreateFirestormOnUnitEnter,
  DamageAllOnTurnEnd,
  FirestormOnTurnEndId,
} from '@repo/game/data'
import { ModifierInline } from '@shared/ModifierInline'
import { MODIFIER_NAMES, ModifierRenderer } from '..'
import { ModifierName, TriggerName } from '../_helpers'

export const CreateSandstormOnUnitEnterRenderer: ModifierRenderer = {
  name: (mod) => <ModifierName>{MODIFIER_NAMES[mod.registryId]}</ModifierName>,
  description: (mod) => {
    const modifier = mod as CreateFirestormOnUnitEnter
    return (
      <div>
        <TriggerName>On self enter:</TriggerName>
        <span>
          Applies{' '}
          <ModifierInline
            modifier={
              new DamageAllOnTurnEnd({
                registryId: FirestormOnTurnEndId,
                factor: modifier.damageFactor,
                duration: modifier.damageDuration,
                damageType: 'fire',
              })
            }
          />{' '}
          to the battlefield.
        </span>
      </div>
    )
  },
}
