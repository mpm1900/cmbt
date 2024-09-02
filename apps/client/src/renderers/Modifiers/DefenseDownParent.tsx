import { DefenseDownParent } from '@repo/game/data'
import { MODIFIER_NAMES, ModifierRenderer } from '.'
import { ModifierName, ModifierValues } from './_helpers'

export const DefenseDownParentRenderer: ModifierRenderer = {
  name: (mod) => <ModifierName>{MODIFIER_NAMES[mod.registryId]}</ModifierName>,
  description: (mod) => {
    const modifier = mod as DefenseDownParent
    return (
      <ModifierValues
        factor={modifier.factor * -1}
        static={modifier.static * -1}
      >
        Defense
      </ModifierValues>
    )
  },
}
