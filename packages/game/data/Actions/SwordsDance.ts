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
import { SwordsDanceId } from '../Ids'
import { AttackUpParent } from '../Modifiers'
import { UpdateFocusParent } from '../Mutations'
import { EmptyArray } from '../Queries/EmptyArray'

export class SwordsDance extends Action {
  factor: number = 1.0

  constructor(sourceId: Id, teamId: Id) {
    super(SwordsDanceId, {
      sourceId,
      teamId,
      cost: new UpdateFocusParent({
        sourceId: sourceId,
        parentId: sourceId,
        static: -30,
      }),

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
          addedModifiers: [
            new AttackUpParent({
              sourceId: source.id,
              parentId: source.id,
              factor: this.factor,
              maxInstances: 6,
            }),
          ],
        },
      })
    )
  }
}
