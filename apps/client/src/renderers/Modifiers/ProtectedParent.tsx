import { MODIFIER_NAMES, ModifierRenderer } from '.'
import { ModifierName } from './_helpers'

export const ProtectedParentRenderer: ModifierRenderer = {
  name: (mod) => <ModifierName>{MODIFIER_NAMES[mod.registryId]}</ModifierName>,
  description: (mod) => {
    return <div>Protected units cannot be targeted by actions.</div>
  },
}
