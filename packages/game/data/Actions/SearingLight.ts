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
import { SearingLightId } from '../Ids'
import { HealParent, Identity } from '../Mutations'
import { GetUnits } from '../Queries'

export class SearingLight extends Action {
  healthFactor = 0.5
  damage: Damage

  constructor(sourceId: Id, teamId: Id) {
    super(SearingLightId, {
      sourceId,
      teamId,
      cost: new Identity({}),
      targets: new GetUnits({
        isActive: true,
        isHidden: false,
      }),
      maxTargetCount: 1,
    })

    this.damage = {
      power: 60,
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
              if (isAlly) {
                return [
                  new HealParent({
                    sourceId: source.id,
                    parentId: target.id,
                    healthFactor: this.healthFactor,
                  }),
                ]
              } else {
                const damage = calculateDamage(
                  this.damage,
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
