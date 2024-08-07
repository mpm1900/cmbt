import random from 'random'
import {
  Action,
  ActionResult,
  CombatContext,
  Id,
  Unit,
  ActionAi,
  AttackTypes,
  ActionResolveOptions,
  Damage,
} from '../../types'
import {
  calculateDamage,
  getActionData,
  modifyRenderContext,
  buildActionResult,
} from '../../utils'
import { DamageParent, Identity } from '../Mutations'
import { GetUnits } from '../Queries'
import { getDamageAi } from '../../utils/getDamageAiAction'
import { ActionId } from '../Ids'

export const FurySwipesId = ActionId()
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
    }
  }

  mapTargets = (targets: Unit[], ctx: CombatContext): Unit[] => {
    return targets.reduce<Unit[]>((result, current) => {
      const length = random.int(4, 6)
      return [...result, ...Array(length).fill(current)]
    }, [])
  }

  threshold = (source: Unit): number | undefined => {
    return 100 + source.stats.accuracy
  }
  critical = (source: Unit): number | undefined => undefined
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
          mutations: modifiedTargets.map((target) => {
            const { damage } = calculateDamage(
              this.damage,
              data.source,
              target,
              data.accuracyRoll
            )
            return new DamageParent({
              sourceId: source.id,
              parentId: target.id,
              damage,
            })
          }),
        },
      })
    )
  }
}
