import {
  Action,
  ActionResult,
  AiAction,
  CombatContext,
  Id,
  Unit,
} from '../../types'
import {
  applyModifiers,
  calculateDamage,
  getActionData,
  getDamageAiAction,
} from '../../utils'
import { ActionId } from '../Id'
import { DamageParent, Identity } from '../Mutations'
import { SetLastUsedAction } from '../Mutations/system'
import { GetUnits } from '../Queries'

export const MagicMissileId = ActionId()
export class MagicMissile extends Action {
  constructor(sourceId: Id, teamId: Id) {
    super(MagicMissileId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      targets: new GetUnits({
        notTeamId: teamId,
        isActive: true,
      }),
      attackType: 'magic',
      maxTargetCount: 2,
    })
  }

  threshold = (source: Unit): number | undefined => undefined
  critical = (source: Unit): number | undefined => undefined
  getAiAction(targets: Unit[], ctx: CombatContext): AiAction {
    return getDamageAiAction(this, targets, ctx)
  }

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext
  ): ActionResult => {
    const data = getActionData(source, this, ctx)
    return {
      action: this,
      source,
      targets,
      mutations: [
        new SetLastUsedAction({
          sourceId: this.sourceId,
          parentId: this.sourceId,
          actionId: this.id,
        }),
        ...targets
          .map((target) => [target, applyModifiers(target, ctx).unit])
          .map(([target, modifiedTarget]) => {
            const damage = calculateDamage(
              { value: 55, attackType: 'magic' },
              data.source,
              modifiedTarget,
              data.accuracyRoll
            )
            return new DamageParent({
              sourceId: source.id,
              parentId: target.id,
              damage,
            })
          }),
      ],
      addedModifiers: [],
    }
  }
}
