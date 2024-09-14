import { HealParentOnUnitSwitch } from '@repo/game/data'
import { Modifier } from '@repo/game/types'
import { MODIFIER_NAMES, ModifierRenderer } from '..'
import { ModifierName, TriggerName } from '../_helpers'

export const HealParentOnUnitSwitchRenderer: ModifierRenderer = {
  name: (mod) => <ModifierName>{MODIFIER_NAMES[mod.registryId]}</ModifierName>,
  description: (modifier: Modifier) => (
    <div>
      <TriggerName>On self switch out:</TriggerName>
      This unit heals up to{' '}
      {(modifier as unknown as HealParentOnUnitSwitch).factor * 100}% of their
      max health.
    </div>
  ),
}
