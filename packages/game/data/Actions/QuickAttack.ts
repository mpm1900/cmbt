import {
  Action,
  ActionResult,
  ActionAi,
  CombatContext,
  Id,
  Unit,
} from '../../types'
import {
  applyModifiers,
  calculateDamage,
  getActionData,
  getDamageAi,
} from '../../utils'
import { ActionId } from '../Ids'
import { DamageParent, Identity } from '../Mutations'
import { SetLastUsedAction } from '../Mutations/system'
import { GetUnits } from '../Queries'

export const QuickAttackId = ActionId()

export class QuickAttack extends Action {
  damage: number = 40
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
  getAi(targets: Unit[], ctx: CombatContext): ActionAi {
    return getDamageAi(this, targets, ctx)
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
              { value: this.damage, attackType: this.attackType },
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
