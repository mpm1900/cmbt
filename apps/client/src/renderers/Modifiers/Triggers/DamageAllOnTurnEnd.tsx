import { DamageAllOnTurnEnd } from '@repo/game/data'
import { DamageInline } from '@shared/DamageInline'
import { MODIFIER_NAMES, ModifierRenderer } from '..'
import { ModifierName, TriggerName } from '../_helpers'

export const DamageAllOnTurnEndRenderer: ModifierRenderer = {
  name: (mod) => <ModifierName>{MODIFIER_NAMES[mod.registryId]}</ModifierName>,
  description: (mod) => {
    const modifier = mod as DamageAllOnTurnEnd

    return (
      <div>
        <TriggerName>On turn end:</TriggerName>
        <div>
          Units take{' '}
          {modifier.damage && <DamageInline damage={modifier.damage} />} damage
        </div>
      </div>
    )
  },
}
