import { DamageParentOnTurnEnd } from '@repo/game/data'
import { MODIFIER_NAMES, ModifierRenderer } from '.'
import { ModifierName, TriggerName } from './_helpers'

export const DamageParentOnTurnEndRenderer: ModifierRenderer = {
  name: (mod) => <ModifierName>{MODIFIER_NAMES[mod.registryId]}</ModifierName>,
  description: (mod) => {
    const modifier = mod as DamageParentOnTurnEnd
    return (
      <div className="space-x-2">
        <TriggerName>On turn end:</TriggerName>
        {modifier.factor !== 0 && (
          <span>
            Afflicted unit takes {(modifier.factor * 100).toFixed(1)}% damage.
          </span>
        )}
        {modifier.static !== 0 && (
          <span>Afflicted unit takes {modifier.static} damage.</span>
        )}
      </div>
    )
  },
}
