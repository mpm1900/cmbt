import { AttackUpParent } from '@repo/game/data'
import { MODIFIER_NAMES, ModifierRenderer } from '.'
import { ModifierName, ModifierValues } from './_helpers'

export const AttackUpParentRenderer: ModifierRenderer = {
  name: (mod) => <ModifierName>{MODIFIER_NAMES[mod.registryId]}</ModifierName>,
  description: (mod) => {
    const modifier = mod as AttackUpParent
    return (
      <ModifierValues factor={modifier.factor} static={modifier.static}>
        Attack
      </ModifierValues>
    )
  },
}
