import { Action, ActionResult, CombatContext, Id, Unit } from '../../types'
import { buildActionResult, getActionData } from '../../utils'
import { BlessedParentId, BlessId } from '../Ids'
import { UpdateFlagParent } from '../Modifiers'
import { Identity } from '../Mutations'
import { GetUnits } from '../Queries'

export class Bless extends Action {
  constructor(sourceId: Id, teamId: Id) {
    super(BlessId, {
      sourceId,
      teamId,
      cost: new Identity({}),
      targets: new GetUnits({
        notId: sourceId,
        teamId: teamId,
        isActive: true,
      }),
      maxTargetCount: 1,
    })
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
          onSuccess: {
            addedModifiers: modifiedTargets.flatMap((target) => [
              new UpdateFlagParent({
                registryId: BlessedParentId,
                sourceId: source.id,
                parentId: target.id,
                flag: 'isBlessed',
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
