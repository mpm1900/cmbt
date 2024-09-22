import {
  Action,
  ActionAi,
  ActionResult,
  CombatContext,
  Id,
  Unit,
} from '../../types'
import {
  applyModifiers,
  buildActionResult,
  calculateDamages,
  getActionData,
  getMutationsFromDamageResult,
} from '../../utils'
import { getDamageAiRating } from '../../utils/getDamageAiRating'
import { EarthquakeId } from '../Ids'
import { Identity } from '../Mutations'
import { EmptyArray } from '../Queries'
import { FlyingId } from '../Tags'

export class Earthquake extends Action {
  constructor(sourceId: Id, teamId: Id) {
    super(EarthquakeId, {
      sourceId,
      teamId,
      cost: new Identity({}),
      targets: new EmptyArray(),
      maxTargetCount: 0,
    })

    this.damages = [
      {
        power: 100,
        attackType: 'physical',
        damageType: 'force',
      },
    ]
  }

  threshold = (source: Unit): number | undefined => 95 + source.stats.accuracy
  criticalThreshold = (source: Unit): number | undefined =>
    5 + source.stats.criticalChance
  criticalFactor = (source: Unit): number | undefined =>
    1.2 + source.stats.criticalDamage

  getAi(targets: Unit[], ctx: CombatContext): ActionAi {
    return getDamageAiRating(this, targets, ctx)
  }

  mapTargets = (targets: Unit[], ctx: CombatContext): Unit[] => {
    return ctx.units
      .map((u) => applyModifiers(u, ctx).unit)
      .filter((u) => u.flags.isActive && u.id !== this.sourceId)
  }

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext
  ): ActionResult[] => {
    const data = getActionData(source, this, ctx)

    return [
      buildActionResult(
        this,
        data,
        source,
        targets,
        ctx,
        (modifiedTargets) => ({
          onSuccess: {
            mutations: modifiedTargets.flatMap((target) => {
              const isFlying = target.tags.some((t) => t.id === FlyingId)
              const damage = calculateDamages(
                this.damages.map((d) => ({
                  ...d,
                  power: isFlying ? 0 : d.power,
                })),
                data.source,
                target,
                data.accuracyRoll
              )
              return getMutationsFromDamageResult(source, target, damage)
            }),
          },
        })
      ),
    ]
  }
}
