import {
  ChillingGrasp,
  ChillingGraspId,
  DrainLifeParentOnTurnEnd,
} from '@repo/game/data'
import { ModifierInline } from '@shared/ModifierInline'
import { ACTION_NAMES, ActionRenderer } from '.'

export const ChillingGraspRenderer: ActionRenderer = {
  name: ACTION_NAMES[ChillingGraspId],
  description: (a, props) => {
    const action = a as ChillingGrasp
    return (
      <div>
        Applies{' '}
        <ModifierInline
          modifier={
            new DrainLifeParentOnTurnEnd({
              duration: action.duration,
              damage: {
                attackType: 'magic',
                damageType: 'blight',
                factor: action.damageFactor,
              },
            })
          }
        />{' '}
        to target enemy unit.
      </div>
    )
  },
}
