import {
  Action,
  ActionResolveOptions,
  ActionResult,
  ActionAi,
  CombatContext,
  Id,
  Unit,
  Damage,
} from '../../types'
import {
  calculateDamage,
  getActionData,
  buildActionResult,
  getMutationsFromDamageResult,
  applyModifiers,
} from '../../utils'
import { getDamageAi } from '../../utils/getDamageAiAction'
import { modifyRenderContext } from '../../utils/modifyRenderContext'
import { ActionId } from '../Ids'
import { Identity } from '../Mutations'
import { EmptyArray } from '../Queries'

export const EarthquakeId = ActionId()
export class Earthquake extends Action {
  damage: Damage

  constructor(sourceId: Id, teamId: Id) {
    const attackType = 'physical'
    super(EarthquakeId, {
      sourceId,
      teamId,
      cost: new Identity({}),
      targets: new EmptyArray(),
      attackType,
      maxTargetCount: 0,
    })

    this.damage = {
      value: 100,
      attackType,
      damageType: 'force',
    }
  }

  threshold = (source: Unit): number | undefined => 95 + source.stats.accuracy
  critical = (source: Unit): number | undefined => 5
  getAi(targets: Unit[], ctx: CombatContext): ActionAi {
    return getDamageAi(this, targets, ctx)
  }

  mapTargets = (targets: Unit[], ctx: CombatContext): Unit[] => {
    return ctx.units
      .map((u) => applyModifiers(u, ctx).unit)
      .filter((u) => u.flags.isActive && u.id !== this.sourceId)
  }

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext,
    options?: ActionResolveOptions
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
      })
    )
  }
}
