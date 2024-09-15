import {
  Intoxicate,
  IntoxicateId,
  MaxAttackParentId,
  UpdateStatStageParent,
} from '@repo/game/data'
import { ModifierInline } from '@shared/ModifierInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const IntoxicateRenderer: ActionRenderer = {
  name: ACTION_NAMES[IntoxicateId],
  cost: () => `50% HP`,
  description: (action, props) => {
    const intoxicate = action as Intoxicate
    return (
      <div>
        This unit loses {intoxicate.factor * 100}% of their max HP, then gains{' '}
        <ModifierInline
          side={props?.side}
          modifier={
            new UpdateStatStageParent({
              registryId: MaxAttackParentId,
              stat: 'attack',
              stages: intoxicate.stages,
            })
          }
        />
        .
      </div>
    )
  },
  failureLog: (result) => <>{ACTION_NAMES[IntoxicateId]} failed.</>,
}
