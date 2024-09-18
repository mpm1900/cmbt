import { MODIFIER_NAMES, ModifierRenderer } from '.'
import { ModifierName } from './_helpers'

export const IntangibleParentRenderer: ModifierRenderer = {
  name: (mod) => <ModifierName>{MODIFIER_NAMES[mod.registryId]}</ModifierName>,
  description: (mod) => {
    return (
      <div>
        {MODIFIER_NAMES[mod.registryId]} cannot be targeted by all actions or
        damaged by all sources.
      </div>
    )
  },
}
