import {
  Action,
  ActionId,
  ActionRenderResult,
  GameContext,
  Id,
  Unit,
} from '../../types'
import { PowerDownParent, BurnedPowerDownId } from '../Modifiers'
import { ReduceFocusParent } from '../Modifiers/costs'
import { SetLastUsedAction } from '../Modifiers/system'
import { BurnDamageOnTurnEndId, DamageParentOnTurnEnd } from '../Triggers'

export const WillOWispId = ActionId()

export class WillOWisp extends Action {
  maxTargetCount: number = 1

  constructor(sourceId: Id, teamId: Id) {
    super(WillOWispId, {
      sourceId,
      teamId,
      cost: new ReduceFocusParent({
        sourceId: sourceId,
        offset: 20,
      }),
      attackType: 'magic',
    })
  }

  checkCost = (source: Unit): boolean => {
    return source.values.focus >= 20
  }

  targets = (unit: Unit, ctx: GameContext): boolean => {
    return super.targets(unit, ctx) && unit.teamId !== this.teamId
  }

  threshold = (source: Unit): number | undefined => {
    return 70 + source.stats.accuracy
  }
  critical = (source: Unit): number | undefined => undefined

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: GameContext
  ): ActionRenderResult => {
    return {
      source,
      targets,
      mutations: [
        new SetLastUsedAction({
          sourceId: this.sourceId,
          parentId: this.sourceId,
          actionId: this.id,
        }),
      ],
      modifiers: targets.flatMap((target) => [
        new PowerDownParent({
          sourceId: source.id,
          parentId: target.id,
          coef: 2,
          duration: 5,
          maxInstances: 1,
          rid: BurnedPowerDownId,
        }),
        new DamageParentOnTurnEnd({
          sourceId: source.id,
          parentId: target.id,
          damage: 10,
          duration: 5,
          maxInstances: 1,
          rid: BurnDamageOnTurnEndId,
        }),
      ]),
    }
  }
}
