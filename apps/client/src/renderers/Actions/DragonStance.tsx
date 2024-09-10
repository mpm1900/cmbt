import {
  AttackStageUpParentId,
  DragonStance,
  DragonStanceId,
  SpeedStageUpParentId,
  UpdateStatStageParent,
} from '@repo/game/data'
import { ModifierInline } from '@shared/ModifierInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const DragonStanceRenderer: ActionRenderer = {
  name: ACTION_NAMES[DragonStanceId],
  description: (action, props) => {
    const dragonstance = action as DragonStance
    return (
      <div>
        Applies{' '}
        <ModifierInline
          side={props?.side}
          modifier={
            new UpdateStatStageParent({
              registryId: AttackStageUpParentId,
              stat: 'attack',
              offset: dragonstance.offset,
            })
          }
        />
        {' and '}
        <ModifierInline
          side={props?.side}
          modifier={
            new UpdateStatStageParent({
              registryId: SpeedStageUpParentId,
              stat: 'speed',
              offset: dragonstance.offset,
            })
          }
        />{' '}
        to this unit.
      </div>
    )
  },
}
