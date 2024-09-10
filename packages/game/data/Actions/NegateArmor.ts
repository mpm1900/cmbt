import {
  Action,
  ActionAi,
  ActionResolveOptions,
  ActionResult,
  CombatContext,
  Id,
  Unit,
} from '../../types'
import {
  buildActionResult,
  getActionData,
  modifyRenderContext,
} from '../../utils'
import { NegateArmorId } from '../Ids'
import { Identity, UpdateValueParent } from '../Mutations'
import { GetUnits } from '../Queries'

export class NegateArmor extends Action {
  constructor(sourceId: Id, teamId: Id) {
    super(NegateArmorId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      targets: new GetUnits({
        notTeamId: teamId,
        isActive: true,
        isHidden: false,
      }),
      maxTargetCount: 1,
    })
  }

  getAi(targets: Unit[], ctx: CombatContext): ActionAi {
    return { action: this, weight: 0, targetIds: [] }
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
          mutations: modifiedTargets.flatMap((target) => [
            new UpdateValueParent({
              sourceId: source.id,
              parentId: target.id,
              valueKey: 'physicalArmor',
              factor: -1,
            }),
            new UpdateValueParent({
              sourceId: source.id,
              parentId: target.id,
              valueKey: 'magicArmor',
              factor: -1,
            }),
          ]),
        },
      })
    )
  }
}
