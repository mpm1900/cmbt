import {
  Action,
  ActionAi,
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
  getDamageAi,
  getMutationsFromDamageResult,
  modifyRenderContext,
} from '../../utils'
import { BodySlamId } from '../Ids'
import { Identity } from '../Mutations'
import { GetUnits } from '../Queries'

export class BodySlam extends Action {
  damage: Damage
  missDamage: Damage

  constructor(sourceId: Id, teamId: Id) {
    const attackType = 'physical'
    super(BodySlamId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      targets: new GetUnits({
        notTeamId: teamId,
        isActive: true,
      }),
      attackType,
      maxTargetCount: 1,
    })

    this.damage = {
      value: 100,
      attackType,
      damageType: 'force',
    }
    this.missDamage = {
      value: 30,
      attackType,
    }
  }

  threshold = (source: Unit): number | undefined => {
    return 85 + source.stats.accuracy
  }
  criticalThreshold = (source: Unit): number | undefined => undefined
  criticalFactor = (source: Unit): number | undefined => undefined
  getAi(targets: Unit[], ctx: CombatContext): ActionAi {
    return getDamageAi(this, targets, ctx)
  }

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext,
    options: ActionResolveOptions
  ): ActionResult => {
    ctx = modifyRenderContext(options, ctx)
    const data = getActionData(source, this, ctx)

    return buildActionResult(
      this,
      data,
      source,
      targets,
      ctx,
      (modifiedTargets) => ({
        onSuccess: {
          mutations: modifiedTargets.flatMap((target) => {
            const damage = calculateDamage(
              this.damage,
              data.source,
              target,
              data.accuracyRoll
            )
            return getMutationsFromDamageResult(source, target, damage)
          }),
        },
        onFailure: {
          mutations: (() => {
            const damage = calculateDamage(
              this.missDamage,
              data.source,
              source,
              data.accuracyRoll
            )
            return getMutationsFromDamageResult(source, source, damage)
          })(),
        },
      })
    )
  }
}
