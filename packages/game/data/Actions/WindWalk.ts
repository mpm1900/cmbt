import random from 'random'
import { Action, ActionResult, CombatContext, Id, Unit } from '../../types'
import { buildActionResult, getActionData } from '../../utils'
import { SpeedUpTeamId, WindWalkId } from '../Ids'
import { UpdateStatTeam } from '../Modifiers'
import { Identity } from '../Mutations'
import { EmptyArray } from '../Queries'

export class WindWalk extends Action {
  speedUpFactor = 1
  duration = 4

  constructor(sourceId: Id, teamId: Id) {
    super(WindWalkId, {
      sourceId,
      teamId,
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
            addedModifiers: [
              new UpdateStatTeam({
                registryId: SpeedUpTeamId,
                teamId: source.teamId,
                sourceId: source.id,
                duration: this.duration,
                factor: this.speedUpFactor,
                stat: 'speed',
              }),
            ],
          },
        })
      ),
    ]
  }
}
