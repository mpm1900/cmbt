import random from 'random'
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
  getMutationsFromDamageResult,
  modifyRenderContext,
} from '../../utils'
import { getDamageAi } from '../../utils/getDamageAiAction'
import { FurySwipesId } from '../Ids'
import { Identity } from '../Mutations'
import { GetUnits } from '../Queries'

export class FurySwipes extends Action {
  damage: Damage

  constructor(sourceId: Id, teamId: Id) {
    const attackType = 'physical'
    super(FurySwipesId, {
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
      value: 4,
      attackType,
      damageType: 'force',
    }
  }

  mapTargets = (targets: Unit[], ctx: CombatContext): Unit[] => {
    return targets.reduce<Unit[]>((result, current) => {
      const length = random.int(4, 6)
      return [...result, ...Array(length).fill(current)]
    }, [])
  }

  threshold = (source: Unit): number | undefined => {
    return 95 + source.stats.accuracy
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
      })
    )
  }
}
