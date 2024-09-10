import {
  AttackStageUpParentId,
  BattleStance,
  BattleStanceId,
  DefenseStageUpParentId,
  SpeedStageDownParentId,
  UpdateStatStageParent,
} from '@repo/game/data'
import { ModifierInline } from '@shared/ModifierInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const BattleStanceRenderer: ActionRenderer = {
  name: ACTION_NAMES[BattleStanceId],
  description: (action, props) => {
    const battlestance = action as BattleStance
    return (
      <div>
        Applies{' '}
        <ModifierInline
          side={props?.side}
          modifier={
            new UpdateStatStageParent({
              registryId: AttackStageUpParentId,
              stat: 'attack',
              stages: battlestance.offset,
            })
          }
        />
        {', '}
        <ModifierInline
          side={props?.side}
          modifier={
            new UpdateStatStageParent({
              registryId: DefenseStageUpParentId,
              stat: 'defense',
              stages: battlestance.offset,
            })
          }
        />
        {' and '}
        <ModifierInline
          side={props?.side}
          modifier={
            new UpdateStatStageParent({
              registryId: SpeedStageDownParentId,
              stat: 'speed',
              stages: battlestance.offset * -1,
            })
          }
        />{' '}
        to this unit.
      </div>
    )
  },
}
