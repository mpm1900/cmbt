import {
  Action,
  ACTION_PRIORITIES,
  ActionResult,
  CombatContext,
  Id,
  Unit,
} from '../../types'
import { buildActionResult, getActionData } from '../../utils'
import { BanedParentId, BaneId } from '../Ids'
import { UpdateFlagParent } from '../Modifiers'
import { Identity } from '../Mutations'
import { GetUnits } from '../Queries'

export class Bane extends Action {
  constructor(sourceId: Id, teamId: Id) {
    super(BaneId, {
      sourceId,
      teamId,
      cost: new Identity({}),
      targets: new GetUnits({
        notTeamId: teamId,
        isActive: true,
        isHidden: false,
      }),
      maxTargetCount: 1,
      priority: ACTION_PRIORITIES.SUPER_FAST,
    })
  }

  threshold = (source: Unit): number | undefined => {
    return 90 + source.stats.accuracy
  }

  filter = (source: Unit, ctx: CombatContext) => {
    return super.filter(source, ctx) && source.metadata.activeTurns === 1
  }

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext
  ): ActionResult[] => {
    const data = getActionData(source, this, ctx)

    return [
      buildActionResult(
        this,
        data,
        source,
        targets,
        ctx,
        (modifiedTargets) => ({
          forceFailure: source.metadata.activeTurns > 1,
          onSuccess: {
            addedModifiers: modifiedTargets.flatMap((target) => [
              new UpdateFlagParent({
                registryId: BanedParentId,
                sourceId: source.id,
                parentId: target.id,
                flag: 'isBaned',
                value: true,
                maxInstances: 1,
                duration: 1,
              }),
            ]),
          },
        })
      ),
    ]
  }
}
