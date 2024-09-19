import { nanoid } from 'nanoid'
import {
  Action,
  ACTION_PRIORITIES,
  ActionAi,
  ActionResult,
  CombatContext,
  Id,
  Unit,
} from '../../types'
import { buildActionResult, getActionData, getRandom } from '../../utils'
import { ProtectedParentId, ProtectId } from '../Ids'
import { UpdateFlagParent } from '../Modifiers'
import { Identity } from '../Mutations'
import { EmptyArray } from '../Queries/EmptyArray'

export class Protect extends Action {
  duration: number = 1

  constructor(sourceId: Id, teamId: Id) {
    super(ProtectId, {
      sourceId,
      teamId,
      cost: new Identity({}),
      targets: new EmptyArray(),
      maxTargetCount: 0,
      priority: ACTION_PRIORITIES.PROTECT,
      cooldown: 2,
    })
  }

  getAi(targets: Unit[], ctx: CombatContext): ActionAi {
    return {
      id: nanoid(),
      action: this,
      weight: getRandom([200, 0]),
      targetIds: [],
    }
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
            new UpdateFlagParent({
              registryId: ProtectedParentId,
              sourceId: source.id,
              parentId: source.id,
              duration: this.duration,
              flag: 'isProtected',
              value: true,
            }),
          ],
        },
      })),
    ]
  }
}
