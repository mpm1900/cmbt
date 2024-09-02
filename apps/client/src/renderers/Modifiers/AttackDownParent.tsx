import { AttackDownParent } from '@repo/game/data'
import { MODIFIER_NAMES, ModifierRenderer } from '.'
import { ModifierName, ModifierValues } from './_helpers'

export const AttackDownParentRenderer: ModifierRenderer = {
  name: (mod) => <ModifierName>{MODIFIER_NAMES[mod.registryId]}</ModifierName>,
  description: (mod) => {
    const modifier = mod as AttackDownParent
    return (
      <ModifierValues
        factor={modifier.factor * -1}
        static={modifier.static * -1}
      >
        Attack
      </ModifierValues>
    )
  },
}
