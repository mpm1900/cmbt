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
import { TrickRoomId } from '../Ids'
import { InvertSpeedAll } from '../Modifiers'
import { Identity } from '../Mutations'
import { EmptyArray } from '../Queries/EmptyArray'

export class TrickRoom extends Action {
  constructor(sourceId: Id, teamId: Id) {
    super(TrickRoomId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      targets: new EmptyArray(),
      attackType: 'magic',
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
          addedModifiers: [new InvertSpeedAll({ sourceId: source.id })],
        },
      })
    )
  }
}
