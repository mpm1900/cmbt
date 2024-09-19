import random from 'random'
import { Action, ActionResult, CombatContext, Id, Unit } from '../../types'
import { buildActionResult, getActionData } from '../../utils'
import { HoldCreatureId, StunnedParentId } from '../Ids'
import { UpdateFlagParent } from '../Modifiers'
import { Identity } from '../Mutations'
import { GetUnits } from '../Queries'

export class HoldCreature extends Action {
  constructor(sourceId: Id, teamId: Id) {
    super(HoldCreatureId, {
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

  threshold = (source: Unit): number | undefined => 85 + source.stats.accuracy

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext
  ): ActionResult[] => {
    const data = getActionData(source, this, ctx)
    const duration = random.int(2, 4)

    return [
      buildActionResult(
        this,
        data,
        source,
        targets,
        ctx,
        (modifiedTargets) => ({
          onSuccess: {
            addedModifiers: modifiedTargets.map(
              (target) =>
                new UpdateFlagParent({
                  registryId: StunnedParentId,
                  sourceId: source.id,
                  parentId: target.id,
                  flag: 'isStunned',
                  value: true,
                  duration: duration,
                })
            ),
          },
        })
      ),
    ]
  }
}
