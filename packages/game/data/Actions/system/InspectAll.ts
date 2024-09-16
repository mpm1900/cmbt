import { Action, ActionResult, CombatContext, Id, Unit } from '../../../types'
import { buildActionResult, getActionData } from '../../../utils'
import { InspectAllId } from '../../Ids'
import { InspectedAll } from '../../Modifiers'
import { Identity } from '../../Mutations'
import { EmptyArray } from '../../Queries/EmptyArray'

export class InspectAll extends Action {
  constructor(sourceId: Id, teamId?: Id) {
    super(InspectAllId, {
      sourceId,
      teamId: teamId ?? '',
      cost: new Identity({ sourceId }),
      targets: new EmptyArray(),
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
          addedModifiers: [
            new InspectedAll({
              sourceId: source.id,
              maxInstances: 1,
            }),
          ],
        },
      })),
    ]
  }
}
