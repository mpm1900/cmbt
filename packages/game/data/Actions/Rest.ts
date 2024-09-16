import { Action, ActionResult, CombatContext, Id, Unit } from '../../types'
import { buildActionResult, getActionData } from '../../utils'
import { RestId, SleepingParentId } from '../Ids'
import { UpdateFlagParent } from '../Modifiers'
import { HealParent, Identity } from '../Mutations'
import { EmptyArray } from '../Queries'

export class Rest extends Action {
  duration: number = 3

  constructor(sourceId: Id, teamId: Id) {
    super(RestId, {
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
              new HealParent({
                sourceId: source.id,
                parentId: source.id,
                damageFactor: 1,
              }),
            ],
            addedModifiers: [
              new UpdateFlagParent({
                registryId: SleepingParentId,
                sourceId: source.id,
                parentId: source.id,
                flagKey: 'isStunned',
                value: true,
                duration: this.duration,
              }),
            ],
          },
        })
      ),
    ]
  }
}
