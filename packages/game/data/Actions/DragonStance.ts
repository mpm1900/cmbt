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
import {
  AttackStageUpParentId,
  DragonStanceId,
  SpeedStageUpParentId,
} from '../Ids'
import { UpdateStatStageParent } from '../Modifiers'
import { Identity } from '../Mutations'
import { EmptyArray } from '../Queries/EmptyArray'

export class DragonStance extends Action {
  offset = 1

  constructor(sourceId: Id, teamId: Id) {
    super(DragonStanceId, {
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
                stages: this.offset,
              }),
              new UpdateStatStageParent({
                registryId: SpeedStageUpParentId,
                stat: 'speed',
                sourceId: source.id,
                parentId: source.id,
                stages: this.offset,
              }),
            ],
          },
        })
      ),
    ]
  }
}
