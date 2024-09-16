import {
  Action,
  ACTION_PRIORITIES,
  ActionResult,
  CombatContext,
  Id,
  Unit,
} from '../../types'
import { buildActionResult, getActionData } from '../../utils'
import { applyTauntToQueue } from '../../utils/applyTauntToQueue'
import { TauntId } from '../Ids'
import { Identity } from '../Mutations'
import { EmptyArray } from '../Queries/EmptyArray'

export class Taunt extends Action {
  constructor(sourceId: Id, teamId: Id) {
    super(TauntId, {
      sourceId,
      teamId,
      cost: new Identity({}),
      targets: new EmptyArray(),
      priority: ACTION_PRIORITIES.AFTER_PROTECT,
      maxTargetCount: 0,
    })
  }

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext
  ): ActionResult[] => {
    const data = getActionData(source, this, ctx)

    return [
      buildActionResult(this, data, source, targets, ctx, () => ({
        onSuccess: {
          updateActionQueue: applyTauntToQueue(source, ctx),
        },
      })),
    ]
  }
}
