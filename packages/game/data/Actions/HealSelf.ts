import { Action, ActionResult, CombatContext, Id, Unit } from '../../types'
import { buildActionResult, getActionData } from '../../utils'
import { HealSelfId } from '../Ids'
import { HealParent, Identity } from '../Mutations'
import { EmptyArray } from '../Queries'

export class HealSelf extends Action {
  healthFactor = 0.5

  constructor(sourceId: Id, teamId: Id) {
    super(HealSelfId, {
      sourceId,
      teamId,
      cost: new Identity({}),
      targets: new EmptyArray(),
      maxTargetCount: 0,
    })

    this.damages = []
  }

  resolve(source: Unit, targets: Unit[], ctx: CombatContext): ActionResult[] {
    const data = getActionData(source, this, ctx)

    return [
      buildActionResult(this, data, source, targets, ctx, (modifiedTargets) => {
        return {
          onSuccess: {
            mutations: [
              new HealParent({
                sourceId: source.id,
                parentId: source.id,
                healthFactor: this.healthFactor,
              }),
            ],
          },
        }
      }),
    ]
  }
}
