import { UpdateStatTeam } from '@repo/game/data'
import { MODIFIER_NAMES, ModifierRenderer } from '.'
import { StatRenderers } from '../Stats'
import { ModifierName, ModifierValues } from './_helpers'

export const UpdateStatTeamRenderer: ModifierRenderer = {
  name: (mod) => <ModifierName>{MODIFIER_NAMES[mod.registryId]}</ModifierName>,
  description: (mod) => {
    const modifier = mod as UpdateStatTeam
    const renderer = StatRenderers[modifier.stat]
    return (
      <ModifierValues
        factor={modifier.factor}
        static={modifier.static}
        after={modifier.percentage && '%'}
      >
        {renderer?.name ?? modifier.stat}{' '}
        {renderer?.icon && (
          <>
            (
            <div className="h-[20px] w-[20px] inline-block mb-[-4px]">
              {renderer.icon}
            </div>
            )
          </>
        )}
      </ModifierValues>
    )
  },
}
