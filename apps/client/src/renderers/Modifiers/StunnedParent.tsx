import { MODIFIER_NAMES, ModifierRenderer } from '.'
import { ModifierName } from './_helpers'

export const StunnedParentRenderer: ModifierRenderer = {
  name: (mod) => <ModifierName>{MODIFIER_NAMES[mod.registryId]}</ModifierName>,
  description: (mod) => {
    return <div>Stunned units cannot act.</div>
  },
}
