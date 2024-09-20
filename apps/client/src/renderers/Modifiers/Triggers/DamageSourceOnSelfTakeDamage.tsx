import { DamageParentOnTurnEnd } from '@repo/game/data'
import { DamageInline } from '@shared/DamageInline'
import { MODIFIER_NAMES, ModifierRenderer } from '..'
import { ModifierName, TriggerName } from '../_helpers'

export const DamageSourceOnSelfTakeDamageRenderer: ModifierRenderer = {
  name: (mod) => <ModifierName>{MODIFIER_NAMES[mod.registryId]}</ModifierName>,
  description: (mod) => {
    const modifier = mod as DamageParentOnTurnEnd

    return (
      <div>
        <TriggerName>On self takes damage:</TriggerName>
        <div>
          Damaging unit takes{' '}
          {modifier.damage && <DamageInline damage={modifier.damage} />} damage
        </div>
      </div>
    )
  },
}
