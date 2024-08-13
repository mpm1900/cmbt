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
import { ActionId } from '../Ids'
import { Identity, RemoveMagicArmorParent } from '../Mutations'
import { EmptyArray } from '../Queries'

export const WardId = ActionId()

export class Ward extends Action {
  amount: number
  constructor(sourceId: Id, teamId: Id) {
    super(WardId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      targets: new EmptyArray(),
      maxTargetCount: 0,
    })
    this.amount = -50
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
          mutations: [
            new RemoveMagicArmorParent({
              sourceId: source.id,
              parentId: source.id,
              amount: this.amount,
            }),
          ],
        },
      })
    )
  }
}
