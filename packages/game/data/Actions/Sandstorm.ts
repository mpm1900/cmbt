import {
  Action,
  ActionAi,
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
import { SandstormId, SandstormOnTurnEndId } from '../Ids'
import { Identity } from '../Mutations'
import { EmptyArray } from '../Queries/EmptyArray'
import { DamageAllOnTurnEnd } from '../Triggers'

export class Sandstorm extends Action {
  duration: number = 5
  damageFactor = 0.1

  constructor(sourceId: Id, teamId: Id) {
    super(SandstormId, {
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

    return buildActionResult(this, data, source, targets, ctx, () => ({
      onSuccess: {
        addedModifiers: [
          new DamageAllOnTurnEnd({
            registryId: SandstormOnTurnEndId,
            sourceId: source.id,
            factor: this.damageFactor,
            duration: this.duration,
            maxInstances: 1,
          }),
        ],
      },
    }))
  }
}
