import { AttackStageDownParentId, UpdateStatParent } from '@repo/game/data'
import { ModifierInline } from '@shared/ModifierInline'
import { MODIFIER_NAMES, ModifierRenderer } from '..'
import { ModifierName, TriggerName } from '../_helpers'

export const StatDownStaticAllOnUnitEnterRenderer: ModifierRenderer = {
  name: (mod) => <ModifierName>{MODIFIER_NAMES[mod.registryId]}</ModifierName>,
  description: (mod) => {
    const modifier = mod as UpdateStatParent
    return (
      <div>
        <TriggerName>On self enter:</TriggerName>
        <span>
          Applies{' '}
          <ModifierInline
            modifier={
              new UpdateStatParent({
                registryId: AttackStageDownParentId,
                stat: modifier.stat,
                factor: modifier.factor,
              })
            }
          />{' '}
          to all other units.
        </span>
      </div>
    )
  },
}
