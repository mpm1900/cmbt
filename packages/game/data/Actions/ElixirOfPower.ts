import { Action, ActionResult, CombatContext, Id, Unit } from '../../types'
import { buildActionResult, getActionData } from '../../utils'
import {
  AttackStageUpParentId,
  DefenseStageUpParentId,
  ElixirOfPowerId,
  SpeedStageDownParentId,
} from '../Ids'
import { UpdateStatStageParent } from '../Modifiers'
import { Identity } from '../Mutations'
import { EmptyArray } from '../Queries/EmptyArray'

export class ElixirOfPower extends Action {
  offset = 1

  constructor(sourceId: Id, teamId: Id) {
    super(ElixirOfPowerId, {
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
            addedModifiers: [
              new UpdateStatStageParent({
                registryId: AttackStageUpParentId,
                stat: 'attack',
                sourceId: source.id,
                parentId: source.id,
                stages: this.offset,
              }),
              new UpdateStatStageParent({
                registryId: DefenseStageUpParentId,
                stat: 'defense',
                sourceId: source.id,
                parentId: source.id,
                stages: this.offset,
              }),
              new UpdateStatStageParent({
                registryId: SpeedStageDownParentId,
                stat: 'speed',
                sourceId: source.id,
                parentId: source.id,
                stages: this.offset * -1,
              }),
            ],
          },
        })
      ),
    ]
  }
}
