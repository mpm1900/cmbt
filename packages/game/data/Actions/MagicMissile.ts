import {
  Action,
  ActionResult,
  ActionAi,
  CombatContext,
  Id,
  Unit,
  ActionResolveOptions,
  Damage,
} from '../../types'
import {
  calculateDamage,
  getActionData,
  getDamageAi,
  modifyRenderContext,
  buildActionResult,
} from '../../utils'
import { ActionId } from '../Ids'
import { DamageParent, Identity } from '../Mutations'
import { GetUnits } from '../Queries'

export const MagicMissileId = ActionId()
export class MagicMissile extends Action {
  damage: Damage

  constructor(sourceId: Id, teamId: Id) {
    const attackType = 'magic'
    super(MagicMissileId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      targets: new GetUnits({
        notTeamId: teamId,
        isActive: true,
      }),
      attackType,
      maxTargetCount: 2,
    })

    this.damage = {
      value: 55,
      attackType,
    }
  }

  threshold = (source: Unit): number | undefined => undefined
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
