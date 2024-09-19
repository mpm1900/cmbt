import { AddModifiersToRegistryParent } from '@repo/game/data'
import { ModifierInline } from '@shared/ModifierInline'
import { MODIFIER_NAMES, ModifierRenderer } from '.'
import { ModifierName } from './_helpers'

export const AddModifiersToRegistryAllRenderer: ModifierRenderer = {
  name: (mod) => <ModifierName>{MODIFIER_NAMES[mod.registryId]}</ModifierName>,
  description: (mod) => {
    const modifier = mod as AddModifiersToRegistryParent
    return (
      <div>
        All units lose their{' '}
        {modifier.modifiers.map((m) => (
          <ModifierInline modifier={m} />
        ))}{' '}
        abilities
      </div>
    )
  },
}
