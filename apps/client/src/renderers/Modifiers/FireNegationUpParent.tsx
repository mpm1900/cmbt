import { FireNegationUpParent } from '@repo/game/data'
import { MODIFIER_NAMES, ModifierRenderer } from '.'
import { ModifierName, ModifierValuesPercent } from './_helpers'

export const FireNegationUpParentRenderer: ModifierRenderer = {
  name: (mod) => <ModifierName>{MODIFIER_NAMES[mod.registryId]}</ModifierName>,
  description: (mod) => {
    const modifier = mod as FireNegationUpParent
    return (
      <ModifierValuesPercent factor={modifier.factor} static={modifier.static}>
        Fire Damage Negation
      </ModifierValuesPercent>
    )
  },
}
