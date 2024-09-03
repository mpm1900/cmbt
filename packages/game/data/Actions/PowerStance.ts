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
import { AttackUpParentId, PowerStanceId } from '../Ids'
import { AddActionParent } from '../Modifiers'
import { Identity } from '../Mutations'
import { EmptyArray } from '../Queries/EmptyArray'
import { PowerCleave } from './PowerCleave'

export class PowerStance extends Action {
  action: (u: Unit) => Action = (u) => new PowerCleave(u.id, u.teamId)

  constructor(sourceId: Id, teamId: Id) {
    super(PowerStanceId, {
      sourceId,
      teamId,
      cost: new Identity({}),
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
            new AddActionParent({
              registryId: AttackUpParentId,
              sourceId: source.id,
              parentId: source.id,
              maxInstances: 1,
              duration: 3,
              action: (u) => new PowerCleave(u.id, u.teamId),
            }),
          ],
        },
      })
    )
  }
}
