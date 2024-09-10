import { UpdateStatStageParent } from '@repo/game/data'
import { MODIFIER_NAMES, ModifierRenderer } from '.'
import { StatRenderers } from '../Stats'
import { ModifierName } from './_helpers'

export const UpdateStatStageParentRenderer: ModifierRenderer = {
  name: (mod) => <ModifierName>{MODIFIER_NAMES[mod.registryId]}</ModifierName>,
  description: (mod) => {
    const modifier = mod as UpdateStatStageParent
    const renderer = StatRenderers[modifier.stat]
    return (
      <div>
        <span>
          {modifier.stages > 0 ? '+' : '-'}
          {Math.abs(modifier.stages)} {renderer.name} Stage{' '}
        </span>
        {renderer?.icon && (
          <>
            (
            <div className="h-[20px] w-[20px] inline-block mb-[-4px]">
              {renderer.icon}
            </div>
            )
          </>
        )}
      </div>
    )
  },
}
