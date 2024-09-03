import {
  AttackUpParentId,
  DragonStance,
  DragonStanceId,
  SpeedUpParentId,
  UpdateStatParent,
} from '@repo/game/data'
import { ModifierInline } from '@shared/ModifierInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const DragonStanceRenderer: ActionRenderer = {
  name: ACTION_NAMES[DragonStanceId],
  cost: () => '30 FP',
  description: (action, props) => {
    const dragonstance = action as DragonStance
    return (
      <div>
        Applies{' '}
        <ModifierInline
          side={props?.side}
          modifier={
            new UpdateStatParent({
              registryId: AttackUpParentId,
              stat: 'attack',
              factor: dragonstance.factor,
            })
          }
        />
        {' and '}
        <ModifierInline
          side={props?.side}
          modifier={
            new UpdateStatParent({
              registryId: SpeedUpParentId,
              stat: 'speed',
              factor: dragonstance.factor,
            })
          }
        />{' '}
        to this unit.
      </div>
    )
  },
}
