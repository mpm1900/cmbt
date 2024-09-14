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
  applyModifiers,
  buildActionResult,
  calculateDamage,
  getActionData,
  getMutationsFromDamageResult,
} from '../../utils'
import { getDamageAi } from '../../utils/getDamageAiAction'
import { modifyRenderContext } from '../../utils/modifyRenderContext'
import { MindBlastId } from '../Ids'
import { Identity } from '../Mutations'
import { EmptyArray } from '../Queries'

export class MindBlast extends Action {
  damage: Damage

  constructor(sourceId: Id, teamId: Id) {
    super(MindBlastId, {
      sourceId,
      teamId,
      cost: new Identity({}),
      targets: new EmptyArray(),
      maxTargetCount: 0,
    })

    this.damage = {
      power: 80,
      attackType: 'magic',
      damageType: 'psychic',
    }
  }

  threshold = (source: Unit): number | undefined => 95 + source.stats.accuracy
  criticalThreshold = (source: Unit): number | undefined => undefined
  criticalFactor = (source: Unit): number | undefined => undefined

  getAi(targets: Unit[], ctx: CombatContext): ActionAi {
    return getDamageAi(this, targets, ctx)
  }

  mapTargets = (targets: Unit[], ctx: CombatContext): Unit[] => {
    const source = ctx.units.find((u) => u.id === this.sourceId)
    return ctx.units
      .map((u) => applyModifiers(u, ctx).unit)
      .filter((u) => u.flags.isActive && u.teamId !== source?.teamId)
  }

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext,
    options?: ActionResolveOptions
  ): ActionResult[] => {
    ctx = modifyRenderContext(options, ctx)
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
      ),
    ]
  }
}
