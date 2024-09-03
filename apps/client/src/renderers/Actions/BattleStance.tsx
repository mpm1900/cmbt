import {
  AttackUpParentId,
  BattleStance,
  BattleStanceId,
  DefneseUpParentId,
  UpdateStatParent,
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
            new UpdateStatParent({
              registryId: AttackUpParentId,
              stat: 'attack',
              factor: battlestance.factor,
            })
          }
        />
        {' and '}
        <ModifierInline
          side={props?.side}
          modifier={
            new UpdateStatParent({
              registryId: DefneseUpParentId,
              stat: 'defense',
              factor: battlestance.factor,
            })
          }
        />{' '}
        to this unit.
      </div>
    )
  },
}
