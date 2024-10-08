import { DamageNewUnitsOnUnitEnter } from '@repo/game/data'
import { DamageInline } from '@shared/DamageInline'
import { MODIFIER_NAMES, ModifierRenderer } from '..'
import { ModifierName, TriggerName } from '../_helpers'

export const DamageNewUnitsOnUnitEnterRenderer: ModifierRenderer = {
  name: (mod) => <ModifierName>{MODIFIER_NAMES[mod.registryId]}</ModifierName>,
  description: (mod) => {
    const modifier = mod as DamageNewUnitsOnUnitEnter

    return (
      <div>
        <TriggerName>On unit enter:</TriggerName>
        <div>
          Unit takes{' '}
          {modifier.damage && <DamageInline damage={modifier.damage} />}
        </div>
      </div>
    )
  },
}
