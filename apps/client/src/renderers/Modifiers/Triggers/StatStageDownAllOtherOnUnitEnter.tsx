import { AttackStageDownParentId, UpdateStatStageParent } from '@repo/game/data'
import { ModifierInline } from '@shared/ModifierInline'
import { MODIFIER_NAMES, ModifierRenderer } from '..'
import { ModifierName, TriggerName } from '../_helpers'

export const UpdateStatStageAllOtherOnUnitEnterRenderer: ModifierRenderer = {
  name: (mod) => <ModifierName>{MODIFIER_NAMES[mod.registryId]}</ModifierName>,
  description: (mod) => {
    const modifier = mod as UpdateStatStageParent
    return (
      <div>
        <TriggerName>On self enter:</TriggerName>
        <span>
          Applies{' '}
          <ModifierInline
            modifier={
              new UpdateStatStageParent({
                registryId: AttackStageDownParentId,
                stat: modifier.stat,
                stages: modifier.stages,
              })
            }
          />{' '}
          to all other active units.
        </span>
      </div>
    )
  },
}
