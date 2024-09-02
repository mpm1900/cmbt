import { FireDamageUpParent } from '@repo/game/data'
import { MODIFIER_NAMES, ModifierRenderer } from '.'
import { ModifierName, ModifierValuesPercent } from './_helpers'

export const FireDamageUpParentRenderer: ModifierRenderer = {
  name: (mod) => <ModifierName>{MODIFIER_NAMES[mod.registryId]}</ModifierName>,
  description: (mod) => {
    const modifier = mod as FireDamageUpParent
    return (
      <ModifierValuesPercent factor={modifier.factor} static={modifier.static}>
        Fire Damage
      </ModifierValuesPercent>
    )
  },
}
