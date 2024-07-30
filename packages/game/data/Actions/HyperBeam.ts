import {
  Action,
  ActionId,
  ActionRenderOptions,
  ActionResult,
  GameContext,
  Id,
  Unit,
} from '../../types'
import {
  applyModifiers,
  calculateDamage,
  getActionData,
  parseSuccess,
} from '../../utils'
import { modifyRenderContext } from '../../utils/modifyRenderContext'
import { DamageParent, SetRechargingParent } from '../Modifiers'
import { ReduceFocusParent } from '../Modifiers/costs'

export const HyperBeamId = ActionId()
export class HyperBeam extends Action {
  maxTargetCount: number = 1

  constructor(sourceId: Id, teamId: Id) {
    super(HyperBeamId, {
      sourceId,
      teamId,
      cost: new ReduceFocusParent({
        sourceId: sourceId,
        offset: 30,
      }),
      attackType: 'magic',
    })
  }

  checkCost = (source: Unit): boolean => {
    return source.values.focus >= 30
  }

  targets = (unit: Unit, ctx: GameContext): boolean => {
    return super.targets(unit, ctx) && unit.teamId !== this.teamId
  }

  threshold = (source: Unit): number | undefined => 95 + source.stats.accuracy
  critical = (source: Unit): number | undefined => 5

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: GameContext,
    options?: ActionRenderOptions
  ): ActionResult => {
    ctx = modifyRenderContext(options, ctx)
    const data = getActionData(source, this, ctx)

    return parseSuccess(this, data, source, targets, {
      onSuccess: {
        mutations: targets
          .map((target) => [target, applyModifiers(target, ctx).unit])
          .map(([target, modifiedTarget]) => {
            const damage = calculateDamage(
              {
                damageType: 'force',
                value: data.source.stats.magic,
                attackType: this.attackType,
              },
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
        modifiers: [
          new SetRechargingParent({
            sourceId: source.id,
            parentId: source.id,
            duration: 2,
          }),
        ],
      },
      onFailure: {},
    })
  }
}
