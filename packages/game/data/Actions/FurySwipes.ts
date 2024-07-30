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
import { DamageParent, Identity } from '../Modifiers'
import { SetLastUsedAction } from '../Modifiers/system'

const count = 6

export const FurySwipesId = ActionId()
export class FurySwipes extends Action {
  maxTargetCount: number = 1
  damage: Damage = { value: 4, attackType: 'physical' }

  constructor(sourceId: Id, teamId: Id) {
    super(FurySwipesId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      attackType: 'physical',
    })
  }

  expandTargets = (targets: Unit[], ctx: GameContext): Unit[] => {
    return targets.reduce<Unit[]>((result, current) => {
      return [...result, ...Array(count).fill(current)]
    }, [])
  }

  targets = (unit: Unit, ctx: GameContext): boolean => {
    return super.targets(unit, ctx) && unit.teamId !== this.teamId
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
      modifiers: [],
    }
  }
}
