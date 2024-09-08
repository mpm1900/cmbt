import {
  CreateSandstormOnUnitEnter,
  DamageAllOnTurnEnd,
  SandstormOnTurnEndId,
} from '@repo/game/data'
import { ModifierInline } from '@shared/ModifierInline'
import { MODIFIER_NAMES, ModifierRenderer } from '..'
import { ModifierName, TriggerName } from '../_helpers'

export const CreateSandstormOnUnitEnterRenderer: ModifierRenderer = {
  name: (mod) => <ModifierName>{MODIFIER_NAMES[mod.registryId]}</ModifierName>,
  description: (mod) => {
    const modifier = mod as CreateSandstormOnUnitEnter
    return (
      <div>
        <TriggerName>On self enter:</TriggerName>
        <span>
          Applies{' '}
          <ModifierInline
            modifier={
              new DamageAllOnTurnEnd({
                registryId: SandstormOnTurnEndId,
                factor: modifier.damageFactor,
                duration: modifier.damageDuration,
                damageType: 'force',
              })
            }
          />{' '}
          to the battlefield.
        </span>
      </div>
    )
  },
}
