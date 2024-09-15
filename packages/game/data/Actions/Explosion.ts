import {
  ActionAi,
  ActionResolveOptions,
  ActionResult,
  CombatContext,
  Id,
  Unit,
} from '../../types'
import { Action } from '../../types/Action'
import {
  applyMutation,
  buildActionResult,
  calculateDamage,
  getActionData,
  getDamageAi,
  getMutationsFromDamageResult,
  modifyRenderContext,
} from '../../utils'
import { ExplosionId } from '../Ids'
import { DamageParent, Identity } from '../Mutations'
import { EmptyArray } from '../Queries'
import { ZERO_UNIT } from '../Units'

export class Explosion extends Action {
  constructor(sourceId: Id, teamId: Id) {
    super(ExplosionId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      targets: new EmptyArray(),
      maxTargetCount: 0,
    })

    this.damages = [
      {
        power: 0,
        attackType: 'physical',
        damageType: 'force',
      },
    ]
  }

  getDamage = (source: Unit, targets: Unit[], ctx: CombatContext): number[] => {
    const mutations = this.resolve(source, targets, ctx, {}).flatMap(
      (r) => r.mutations ?? []
    )
    return mutations
      .filter((m) => m.parentId !== this.sourceId)
      .map((m) => applyMutation(ZERO_UNIT, m))
      .map((u) => u.values.damage)
  }

  threshold = (source: Unit): number | undefined => undefined
  criticalThreshold = (source: Unit): number | undefined => undefined
  criticalFactor = (source: Unit): number | undefined => undefined

  getAi(targets: Unit[], ctx: CombatContext): ActionAi {
    return getDamageAi(this, targets, ctx)
  }

  mapTargets = (targets: Unit[], ctx: CombatContext): Unit[] => {
    return ctx.units.filter((u) => u.flags.isActive && u.id !== this.sourceId)
  }

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext,
    options: ActionResolveOptions
  ): ActionResult[] => {
    ctx = modifyRenderContext(options, ctx)
    const data = getActionData(source, this, ctx)
    const remainingHealth = data.source.stats.health - data.source.values.damage

    return [
      buildActionResult(
        this,
        data,
        source,
        targets,
        ctx,
        (modifiedTargets) => ({
          onSuccess: {
            mutations: [
              new DamageParent({
                sourceId: source.id,
                parentId: source.id,
                static: remainingHealth,
              }),
              ...modifiedTargets.flatMap((target) => {
                const damage = calculateDamage(
                  {
                    ...this.damages[0]!,
                    power: data.source.stats.attack * 4,
                  },
                  data.source,
                  target,
                  data.accuracyRoll
                )

                return getMutationsFromDamageResult(source, target, damage)
              }),
            ],
          },
        })
      ),
    ]
  }
}
