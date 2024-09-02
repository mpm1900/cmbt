import { UpdateStatParent } from '@repo/game/data'
import { MODIFIER_NAMES, ModifierRenderer } from '.'
import { StatRenderers } from '../Stats'
import { ModifierName, ModifierValues } from './_helpers'

export const UpdateStatParentRenderer: ModifierRenderer = {
  name: (mod) => <ModifierName>{MODIFIER_NAMES[mod.registryId]}</ModifierName>,
  description: (mod) => {
    const modifier = mod as UpdateStatParent
    return (
      <ModifierValues
        factor={modifier.factor}
        static={modifier.static}
        after={modifier.percentage && '%'}
      >
        {StatRenderers[modifier.stat]?.name ?? modifier.stat}
      </ModifierValues>
    )
  },
}
