import {
  Action,
  ActionId,
  ActionResult,
  GameContext,
  Id,
  Unit,
} from '../../types'
import { applyModifiers, calculateDamage, getActionData } from '../../utils'
import { DamageParent, Identity } from '../Modifiers'
import { SetLastUsedAction } from '../Modifiers/system'

export const MagicMissileId = ActionId()
export class MagicMissile extends Action {
  maxTargetCount: number = 2

  constructor(sourceId: Id, teamId: Id) {
    super(MagicMissileId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      attackType: 'magic',
    })
  }

  targets = (unit: Unit, ctx: GameContext): boolean => {
    return super.targets(unit, ctx) && unit.teamId !== this.teamId
  }

  threshold = (source: Unit): number | undefined => undefined
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
      modifiers: [],
    }
  }
}
