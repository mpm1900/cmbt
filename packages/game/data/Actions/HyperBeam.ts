import {
  Action,
  ActionAi,
  ActionResolveOptions,
  ActionResult,
  AttackTypes,
  CombatContext,
  Id,
  Unit,
} from '../../types'
import {
  buildActionResult,
  calculateDamage,
  getActionData,
  getMutationsFromDamageResult,
  getUnitBase,
} from '../../utils'
import { getDamageAi } from '../../utils/getDamageAiAction'
import { modifyRenderContext } from '../../utils/modifyRenderContext'
import { HyperBeamId } from '../Ids'
import { SetIsStunnedParent } from '../Modifiers'
import { ReduceFocusParent } from '../Mutations'
import { GetUnits } from '../Queries'

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
  criticalThreshold = (source: Unit): number | undefined => 5
  criticalFactor = (source: Unit): number | undefined => 1.25
  getAi(targets: Unit[], ctx: CombatContext): ActionAi {
    return getDamageAi(this, targets, ctx)
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
            const { base } = getUnitBase(source.baseId)
            const damage = calculateDamage(
              {
                value: (base?.stats.magic ?? 0) * 2,
                attackType: this.attackType as AttackTypes,
                damageType: 'force',
              },
              data.source,
              target,
              data.accuracyRoll
            )
            return getMutationsFromDamageResult(source, target, damage)
          }),
          addedModifiers: [
            new SetIsStunnedParent({
              sourceId: source.id,
              parentId: source.id,
              duration: 2,
            }),
          ],
        },
      })
    )
  }
}
