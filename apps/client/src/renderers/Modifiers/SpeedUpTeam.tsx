import { SpeedUpTeam } from '@repo/game/data'
import { MODIFIER_NAMES, ModifierRenderer } from '.'
import { ModifierName, ModifierValues } from './_helpers'

export const SpeedUpTeamRenderer: ModifierRenderer = {
  name: (mod) => <ModifierName>{MODIFIER_NAMES[mod.registryId]}</ModifierName>,
  description: (mod) => {
    const modifier = mod as SpeedUpTeam
    return (
      <ModifierValues factor={modifier.factor} static={modifier.static}>
        Speed
      </ModifierValues>
    )
  },
}
