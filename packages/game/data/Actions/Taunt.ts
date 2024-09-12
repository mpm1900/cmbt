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
      priority: 3,
      maxTargetCount: 0,
    })
  }

  threshold = (source: Unit): number | undefined => undefined
  criticalThreshold = (source: Unit): number | undefined => undefined
  criticalFactor = (source: Unit): number | undefined => undefined
  getAi(targets: Unit[], ctx: CombatContext): ActionAi {
    return { action: this, weight: 0, targetIds: [] }
  }

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext,
    options: ActionResolveOptions
  ): ActionResult[] => {
    ctx = modifyRenderContext(options, ctx)
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
