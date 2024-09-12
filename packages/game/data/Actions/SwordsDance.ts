import {
  Action,
  ActionResolveOptions,
  ActionResult,
  CombatContext,
  Id,
  Unit,
} from '../../types'
import { buildActionResult, getActionData } from '../../utils'
import { modifyRenderContext } from '../../utils/modifyRenderContext'
import { AttackStageUpParentId, SwordsDanceId } from '../Ids'
import { UpdateStatStageParent } from '../Modifiers'
import { Identity } from '../Mutations'
import { EmptyArray } from '../Queries/EmptyArray'

export class SwordsDance extends Action {
  offset = 2

  constructor(sourceId: Id, teamId: Id) {
    super(SwordsDanceId, {
      sourceId,
      teamId,
      cost: new Identity({}),
      targets: new EmptyArray(),
      maxTargetCount: 0,
    })
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
            addedModifiers: [
              new UpdateStatStageParent({
                registryId: AttackStageUpParentId,
                stat: 'attack',
                sourceId: source.id,
                parentId: source.id,
                stages: 2,
              }),
            ],
          },
        })
      ),
    ]
  }
}
