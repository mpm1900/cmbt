import random from 'random'
import {
  Action,
  ActionId,
  ActionResult,
  Damage,
  GameContext,
  Id,
  Unit,
} from '../../types'
import { applyModifiers, calculateDamage, getActionData } from '../../utils'
import { DamageParent, Identity, SetLastUsedAction } from '../Mutations'
import { GetUnits } from '../Queries'

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

  expandTargets = (targets: Unit[], ctx: GameContext): Unit[] => {
    return targets.reduce<Unit[]>((result, current) => {
      const count = random.int(4, 6)
      return [...result, ...Array(count).fill(current)]
    }, [])
  }

  threshold = (source: Unit): number | undefined => {
    return 100 + source.stats.accuracy
  }
  critical = (source: Unit): number | undefined => undefined

  resolve = (source: Unit, targets: Unit[], ctx: GameContext): ActionResult => {
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
