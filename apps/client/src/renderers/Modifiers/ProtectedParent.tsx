import { MODIFIER_NAMES, ModifierRenderer } from '.'
import { ModifierName } from './_helpers'

export const ProtectedParentRenderer: ModifierRenderer = {
  name: (mod) => <ModifierName>{MODIFIER_NAMES[mod.registryId]}</ModifierName>,
  description: (mod) => {
    return (
      <div>
        {MODIFIER_NAMES[mod.registryId]} units cannot be affected by actions.
      </div>
    )
  },
}
