import {
  Action,
  ActionResolveOptions,
  ActionResult,
  CombatContext,
  Damage,
  Id,
  Unit,
} from '../../types'
import {
  buildActionResult,
  calculateDamage,
  getActionData,
  getMutationsFromDamageResult,
  modifyRenderContext,
} from '../../utils'
import { GuidingRayId } from '../Ids'
import { Identity } from '../Mutations'
import { GetUnits } from '../Queries'
import { Guidance } from '../Statuses/Guidance'

export class GuidingRay extends Action {
  damage: Damage

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

    this.damage = {
      power: 75,
      attackType: 'magic',
      damageType: 'holy',
    }
  }

  resolve(
    source: Unit,
    targets: Unit[],
    ctx: CombatContext,
    options?: ActionResolveOptions
  ): ActionResult[] {
    ctx = modifyRenderContext(options, ctx)
    const data = getActionData(source, this, ctx)

    return [
      buildActionResult(this, data, source, targets, ctx, (modifiedTargets) => {
        return {
          onSuccess: {
            mutations: modifiedTargets.flatMap((target) => {
              const isAlly = target.teamId === source.teamId
              if (!isAlly) {
                const damage = calculateDamage(
                  this.damage,
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
                console.log('is ally', Guidance.modifiers(source, target))
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
