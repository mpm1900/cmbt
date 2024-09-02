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
import { RestId } from '../Ids'
import { StunnedParent } from '../Modifiers'
import { Identity, RemoveAllDamageParent } from '../Mutations'
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

  threshold = (source: Unit): number | undefined => {
    return undefined
  }
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
          mutations: [
            new RemoveAllDamageParent({
              sourceId: source.id,
              parentId: source.id,
            }),
          ],
          addedModifiers: [
            new StunnedParent({
              sourceId: source.id,
              parentId: source.id,
              duration: this.duration,
            }),
          ],
        },
      })
    )
  }
}
