import { Action, ActionResult, CombatContext, Id, Unit } from '../../types'
import { buildActionResult, getActionData } from '../../utils'
import { BlockId } from '../Ids'
import { Identity, UpdateValueParent } from '../Mutations'
import { EmptyArray } from '../Queries'

export class Block extends Action {
  factor: number
  constructor(sourceId: Id, teamId: Id) {
    super(BlockId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      targets: new EmptyArray(),
      maxTargetCount: 0,
    })
    this.factor = 0.25
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
            mutations: [
              new UpdateValueParent({
                sourceId: source.id,
                parentId: source.id,
                valueKey: 'physicalArmor',
                static: Math.round(this.factor * data.source.stats.health),
              }),
            ],
          },
        })
      ),
    ]
  }
}
