import { DamageAllOnTurnEnd } from '@repo/game/data'
import { MODIFIER_NAMES, ModifierRenderer } from '.'
import { ModifierName, TriggerName } from './_helpers'

export const DamageAllOnTurnEndRenderer: ModifierRenderer = {
  name: (mod) => <ModifierName>{MODIFIER_NAMES[mod.registryId]}</ModifierName>,
  description: (mod) => {
    const modifier = mod as DamageAllOnTurnEnd
    return (
      <div className="space-x-2">
        <TriggerName>On turn end:</TriggerName>

        {modifier.factor !== 0 && (
          <span>
            Afflicted units take {(modifier.factor * 100).toFixed(1)}% damage.
          </span>
        )}
        {modifier.static !== 0 && (
          <span>Afflicted units take {modifier.static} damage.</span>
        )}
      </div>
    )
  },
}
