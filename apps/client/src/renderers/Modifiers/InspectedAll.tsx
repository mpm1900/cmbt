import { MODIFIER_NAMES, ModifierRenderer } from '.'
import { ModifierName } from './_helpers'

export const InspectedAllRenderer: ModifierRenderer = {
  name: (mod) => <ModifierName>{MODIFIER_NAMES[mod.registryId]}</ModifierName>,
  description: () => <div>Inspected units' stats are visible.</div>,
}
