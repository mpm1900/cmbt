import {
  Action,
  ActionResult,
  ActionAi,
  CombatContext,
  Id,
  Unit,
  ActionResolveOptions,
} from '../../types'
import {
  getActionData,
  modifyRenderContext,
  buildActionResult,
} from '../../utils'
import { ActionId } from '../Ids'
import { Identity } from '../Mutations'
import { EmptyArray } from '../Queries/EmptyArray'
import { DamageAllOnTurnEnd } from '../Triggers'

export const SandstormId = ActionId()

export class Sandstorm extends Action {
  constructor(sourceId: Id, teamId: Id) {
    super(SandstormId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      targets: new EmptyArray(),
      maxTargetCount: 0,
    })
  }

  threshold = (source: Unit): number | undefined => undefined
  critical = (source: Unit): number | undefined => undefined
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

    return buildActionResult(this, data, source, targets, ctx, () => ({
      onSuccess: {
        addedModifiers: [
          new DamageAllOnTurnEnd({
            sourceId: source.id,
            damage: 10,
            duration: 5,
            maxInstances: 1,
          }),
        ],
      },
    }))
  }
}
