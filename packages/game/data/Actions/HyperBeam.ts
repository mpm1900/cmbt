import {
  Action,
  ActionRenderOptions,
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
  parseSuccess,
} from '../../utils'
import { getDamageAiAction } from '../../utils/getDamageAiAction'
import { modifyRenderContext } from '../../utils/modifyRenderContext'
import { ActionId } from '../Id'
import { SetRechargingParent } from '../Modifiers'
import { DamageParent, ReduceFocusParent } from '../Mutations'
import { GetUnits } from '../Queries'

export const HyperBeamId = ActionId()
export class HyperBeam extends Action {
  constructor(sourceId: Id, teamId: Id) {
    super(HyperBeamId, {
      sourceId,
      teamId,
      cost: new ReduceFocusParent({
        sourceId: sourceId,
        parentId: sourceId,
        offset: 30,
      }),
      targets: new GetUnits({
        notTeamId: teamId,
        isActive: true,
      }),
      attackType: 'magic',
      maxTargetCount: 1,
    })
  }

  threshold = (source: Unit): number | undefined => 95 + source.stats.accuracy
  critical = (source: Unit): number | undefined => 5
  getAiAction(targets: Unit[], ctx: CombatContext): AiAction {
    return getDamageAiAction(this, targets, ctx)
  }

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext,
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
        addedModifiers: [
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
