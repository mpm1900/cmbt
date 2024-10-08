import { MODIFIER_NAMES, ModifierRenderer } from '.'
import { ModifierName } from './_helpers'

export const HiddenParentRenderer: ModifierRenderer = {
  name: (mod) => <ModifierName>{MODIFIER_NAMES[mod.registryId]}</ModifierName>,
  description: (mod) => (
    <div>
      {MODIFIER_NAMES[mod.registryId]} units cannot be chosen as targets for
      actions.
    </div>
  ),
}
