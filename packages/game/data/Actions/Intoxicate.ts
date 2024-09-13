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
import { AttackStageUpParentId, IntoxicateId } from '../Ids'
import { UpdateStatStageParent } from '../Modifiers'
import { DamageParent, Identity } from '../Mutations'
import { EmptyArray } from '../Queries'

export class Intoxicate extends Action {
  factor = 0.5
  stages = 6

  constructor(sourceId: Id, teamId: Id) {
    super(IntoxicateId, {
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
      buildActionResult(this, data, source, targets, ctx, (modifiedTargets) => {
        const remainingHealth =
          data.source.stats.health - data.source.values.damage
        const ratio = remainingHealth / data.source.stats.health
        return {
          forceFailure: ratio <= 0.5,
          onSuccess: {
            mutations: [
              new DamageParent({
                sourceId: this.sourceId,
                parentId: this.sourceId,
                factor: this.factor,
              }),
            ],
            addedModifiers: [
              new UpdateStatStageParent({
                registryId: AttackStageUpParentId,
                stat: 'attack',
                sourceId: source.id,
                parentId: source.id,
                stages: this.stages,
              }),
            ],
          },
        }
      }),
    ]
  }
}
