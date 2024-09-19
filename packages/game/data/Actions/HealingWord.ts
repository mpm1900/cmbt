import { Action, ActionResult, CombatContext, Id, Unit } from '../../types'
import { buildActionResult, getActionData } from '../../utils'
import { HealingWordId } from '../Ids'
import { HealParent, Identity } from '../Mutations'
import { GetUnits } from '../Queries'

export class HealingWord extends Action {
  healthFactor = 0.25

  constructor(sourceId: Id, teamId: Id) {
    super(HealingWordId, {
      sourceId,
      teamId,
      cost: new Identity({}),
      targets: new GetUnits({
        teamId: teamId,
      }),
      maxTargetCount: 1,
    })

    this.damages = []
  }

  resolve(source: Unit, targets: Unit[], ctx: CombatContext): ActionResult[] {
    const data = getActionData(source, this, ctx)

    return [
      buildActionResult(this, data, source, targets, ctx, (modifiedTargets) => {
        return {
          onSuccess: {
            mutations: modifiedTargets.map((target) => {
              return new HealParent({
                sourceId: source.id,
                parentId: target.id,
                healthFactor: this.healthFactor,
              })
            }),
          },
        }
      }),
    ]
  }
}
