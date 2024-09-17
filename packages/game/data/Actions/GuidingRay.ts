import { Action, ActionResult, CombatContext, Id, Unit } from '../../types'
import {
  buildActionResult,
  calculateDamages,
  getActionData,
  getMutationsFromDamageResult,
} from '../../utils'
import { GuidingRayId } from '../Ids'
import { Identity } from '../Mutations'
import { GetUnits } from '../Queries'
import { Guidance } from '../Statuses/Guidance'

export class GuidingRay extends Action {
  constructor(sourceId: Id, teamId: Id) {
    super(GuidingRayId, {
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
        power: 75,
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
              if (!isAlly) {
                const damage = calculateDamages(
                  this.damages,
                  data.source,
                  target,
                  data.accuracyRoll
                )

                return getMutationsFromDamageResult(source, target, damage)
              }
              return []
            }),
            addedModifiers: modifiedTargets.flatMap((target) => {
              const isAlly = target.teamId === source.teamId
              if (isAlly) {
                return Guidance.modifiers(source, target)
              }
              return []
            }),
          },
        }
      }),
    ]
  }
}
