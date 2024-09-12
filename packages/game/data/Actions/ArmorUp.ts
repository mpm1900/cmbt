import {
  Action,
  ActionResolveOptions,
  ActionResult,
  CombatContext,
  Id,
  Unit,
} from '../../types'
import {
  buildActionResult,
  getActionData,
  modifyRenderContext,
} from '../../utils'
import { ArmorUpId } from '../Ids'
import { Identity, UpdateValueParent } from '../Mutations'
import { EmptyArray } from '../Queries'

export class ArmorUp extends Action {
  amount: number
  constructor(sourceId: Id, teamId: Id) {
    super(ArmorUpId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      targets: new EmptyArray(),
      maxTargetCount: 0,
    })
    this.amount = 50
  }

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext,
    options: ActionResolveOptions
  ): ActionResult[] => {
    ctx = modifyRenderContext(options, ctx)
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
                static: this.amount,
              }),
            ],
          },
        })
      ),
    ]
  }
}
