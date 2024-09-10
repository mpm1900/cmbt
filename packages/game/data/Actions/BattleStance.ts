import {
  Action,
  ActionAi,
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
  BattleStanceId,
  DefenseStageUpParentId,
  SpeedStageDownParentId,
} from '../Ids'
import { UpdateStatStageParent } from '../Modifiers'
import { Identity } from '../Mutations'
import { EmptyArray } from '../Queries/EmptyArray'

export class BattleStance extends Action {
  offset = 1

  constructor(sourceId: Id, teamId: Id) {
    super(BattleStanceId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      targets: new EmptyArray(),
      maxTargetCount: 0,
    })
  }

  threshold = (source: Unit): number | undefined => undefined
  criticalThreshold = (source: Unit): number | undefined => undefined
  criticalFactor = (source: Unit): number | undefined => undefined
  getAi(targets: Unit[], ctx: CombatContext): ActionAi {
    return { action: this, weight: 0, targetIds: [] }
  }

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext,
    options: ActionResolveOptions
  ): ActionResult => {
    ctx = modifyRenderContext(options, ctx)
    const data = getActionData(source, this, ctx)

    return buildActionResult(
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
    )
  }
}
