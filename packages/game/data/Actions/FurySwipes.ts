import random from 'random'
import {
  Action,
  ActionResult,
  Damage,
  CombatContext,
  Id,
  Unit,
  ActionAi,
} from '../../types'
import { applyModifiers, calculateDamage, getActionData } from '../../utils'
import { DamageParent, Identity } from '../Mutations'
import { GetUnits } from '../Queries'
import { SetLastUsedAction } from '../Mutations/system'
import { getDamageAi } from '../../utils/getDamageAiAction'
import { ActionId } from '../Id'

export const FurySwipesId = ActionId()
export class FurySwipes extends Action {
  damage: Damage = { value: 4, attackType: 'physical' }

  constructor(sourceId: Id, teamId: Id) {
    super(FurySwipesId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      targets: new GetUnits({
        notTeamId: teamId,
        isActive: true,
      }),
      attackType: 'physical',
      maxTargetCount: 1,
    })
  }

  expandTargets = (targets: Unit[], ctx: CombatContext): Unit[] => {
    return targets.reduce<Unit[]>((result, current) => {
      const count = random.int(4, 6)
      return [...result, ...Array(count).fill(current)]
    }, [])
  }

  threshold = (source: Unit): number | undefined => {
    return 100 + source.stats.accuracy
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
        ...this.expandTargets(targets, ctx)
          .map((target) => [target, applyModifiers(target, ctx).unit])
          .map(([target, modifiedTarget]) => {
            const damage = calculateDamage(
              this.damage,
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
