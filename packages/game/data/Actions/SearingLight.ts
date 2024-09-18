import { Action, ActionResult, CombatContext, Id, Unit } from '../../types'
import {
  buildActionResult,
  calculateDamages,
  getActionData,
  getMutationsFromDamageResult,
} from '../../utils'
import { SearingLightId } from '../Ids'
import { HealParent, Identity } from '../Mutations'
import { GetUnits } from '../Queries'

export class SearingLight extends Action {
  healthFactor = 0.3

  constructor(sourceId: Id, teamId: Id) {
    super(SearingLightId, {
      sourceId,
      teamId,
      cost: new Identity({}),
      targets: new GetUnits({
        notId: sourceId,
        isActive: true,
        isHidden: false,
      }),
      maxTargetCount: 1,
    })

    this.damages = [
      {
        power: 70,
        attackType: 'magic',
        damageType: 'holy',
      },
    ]
  }

  resolve(source: Unit, targets: Unit[], ctx: CombatContext): ActionResult[] {
    const data = getActionData(source, this, ctx)

    return [
      buildActionResult(this, data, source, targets, ctx, (modifiedTargets) => {
        return {
          onSuccess: {
            mutations: modifiedTargets.flatMap((target) => {
              const isAlly = target.teamId === source.teamId
              if (isAlly) {
                return [
                  new HealParent({
                    sourceId: source.id,
                    parentId: target.id,
                    healthFactor: this.healthFactor,
                  }),
                ]
              } else {
                const damage = calculateDamages(
                  this.damages,
                  data.source,
                  target,
                  data.accuracyRoll
                )

                return getMutationsFromDamageResult(source, target, damage)
              }
            }),
          },
        }
      }),
    ]
  }
}
