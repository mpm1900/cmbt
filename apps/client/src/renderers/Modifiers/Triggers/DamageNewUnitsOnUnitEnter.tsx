import { DamageNewUnitsOnUnitEnter } from '@repo/game/data'
import { MODIFIER_NAMES, ModifierRenderer } from '..'
import { ModifierName, TriggerName } from '../_helpers'

export const DamageNewUnitsOnUnitEnterRenderer: ModifierRenderer = {
  name: (mod) => <ModifierName>{MODIFIER_NAMES[mod.registryId]}</ModifierName>,
  description: (mod) => {
    const modifier = mod as DamageNewUnitsOnUnitEnter
    return (
      <div className="space-x-2">
        <TriggerName>On unit enter:</TriggerName>
        <span>That unit takes {modifier.static} damage.</span>
      </div>
    )
  },
}
