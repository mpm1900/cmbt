import { HealParentOnTurnEnd } from '@repo/game/data'
import { Modifier } from '@repo/game/types'
import { MODIFIER_NAMES, ModifierRenderer } from '..'
import { ModifierName, TriggerName } from '../_helpers'

export const HealParentOnTurnEndRenderer: ModifierRenderer = {
  name: (mod) => <ModifierName>{MODIFIER_NAMES[mod.registryId]}</ModifierName>,
  description: (modifier: Modifier) => (
    <div className="space-x-2">
      <TriggerName>On turn end:</TriggerName>
      This unit heals{' '}
      {(modifier as unknown as HealParentOnTurnEnd).factor * 100}% of their max
      health.
    </div>
  ),
}
