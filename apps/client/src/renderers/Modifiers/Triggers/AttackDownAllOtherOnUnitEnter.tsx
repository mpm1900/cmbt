import {
  AttackStageDownParentId,
  UpdateStatParent,
  UpdateStatStageParent,
} from '@repo/game/data'
import { ModifierInline } from '@shared/ModifierInline'
import { MODIFIER_NAMES, ModifierRenderer } from '..'
import { ModifierName, TriggerName } from '../_helpers'

export const AttackDownAllOtherOnUnitEnterRenderer: ModifierRenderer = {
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
              new UpdateStatStageParent({
                stat: 'attack',
                registryId: AttackStageDownParentId,
                stages: -1,
              })
            }
          />{' '}
          to all other active units.
        </span>
      </div>
    )
  },
}
