import {
  AttackStageUpParentId,
  SwordsDance,
  SwordsDanceId,
  UpdateStatStageParent,
} from '@repo/game/data'
import { ModifierInline } from '@shared/ModifierInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const SwordsDanceRenderer: ActionRenderer = {
  name: ACTION_NAMES[SwordsDanceId],
  description: (a, props) => {
    const action = a as SwordsDance
    return (
      <div>
        Applies{' '}
        <ModifierInline
          side={props?.side}
          modifier={
            new UpdateStatStageParent({
              registryId: AttackStageUpParentId,
              stat: 'attack',
              stages: action.stages,
            })
          }
        />{' '}
        to this unit.
      </div>
    )
  },
}
