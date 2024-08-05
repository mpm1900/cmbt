import {
  Action,
  ActionId,
  ActionResult,
  CombatContext,
  Id,
  Unit,
} from '../../types'
import { applyModifiers, calculateDamage, getActionData } from '../../utils'
import { DamageParent, Identity, SetLastUsedAction } from '../Mutations'
import { GetUnits } from '../Queries'

export const QuickAttackId = ActionId()

export class QuickAttack extends Action {
  constructor(sourceId: Id, teamId: Id) {
    super(QuickAttackId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      targets: new GetUnits({
        notTeamId: teamId,
        isActive: true,
      }),
      priority: 1,
      attackType: 'physical',
      maxTargetCount: 1,
    })
  }

  threshold = (source: Unit): number | undefined => {
    return 95 + source.stats.accuracy
  }
  critical = (source: Unit): number | undefined => undefined

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
              { value: 40, attackType: this.attackType },
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
