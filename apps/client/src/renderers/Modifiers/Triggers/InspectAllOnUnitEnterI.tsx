import { InspectedAll } from '@repo/game/data'
import { ModifierInline } from '@shared/ModifierInline'
import { MODIFIER_NAMES, ModifierRenderer } from '..'
import { ModifierName, TriggerName } from '../_helpers'

export const InspectAllOnUnitEnterRenderer: ModifierRenderer = {
  name: (mod) => <ModifierName>{MODIFIER_NAMES[mod.registryId]}</ModifierName>,
  description: (mod) => (
    <div>
      <TriggerName>On self enter:</TriggerName>
      <span>
        Applies <ModifierInline modifier={new InspectedAll({})} /> to all units.
      </span>
    </div>
  ),
}
