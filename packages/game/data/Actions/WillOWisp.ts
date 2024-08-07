import {
  Action,
  ActionResolveOptions,
  ActionResult,
  ActionAi,
  CombatContext,
  Id,
  Unit,
} from '../../types'
import { getActionData, buildActionResult } from '../../utils'
import { modifyRenderContext } from '../../utils/modifyRenderContext'
import { ActionId } from '../Ids'
import { PowerDownParent, BurnedPowerDownId } from '../Modifiers'
import { ReduceFocusParent } from '../Mutations'
import { SetLastUsedAction } from '../Mutations/system'
import { GetUnits } from '../Queries'
import { BurnDamageOnTurnEndId, DamageParentOnTurnEnd } from '../Triggers'

export const WillOWispId = ActionId()

export class WillOWisp extends Action {
  constructor(sourceId: Id, teamId: Id) {
    super(WillOWispId, {
      sourceId,
      teamId,
      cost: new ReduceFocusParent({
        sourceId: sourceId,
        parentId: sourceId,
        offset: 20,
      }),
      targets: new GetUnits({
        notTeamId: teamId,
        isActive: true,
      }),
      attackType: 'magic',
      maxTargetCount: 1,
    })
  }

  threshold = (source: Unit): number | undefined => {
    return 90 + source.stats.accuracy
  }
  critical = (source: Unit): number | undefined => undefined
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
          addedModifiers: modifiedTargets.flatMap((target) => [
            new PowerDownParent({
              sourceId: source.id,
              parentId: target.id,
              coef: 2,
              duration: 5,
              maxInstances: 1,
              rid: BurnedPowerDownId,
            }),
            new DamageParentOnTurnEnd({
              sourceId: source.id,
              parentId: target.id,
              damage: 10,
              duration: 5,
              maxInstances: 1,
              rid: BurnDamageOnTurnEndId,
            }),
          ]),
        },
      })
    )
  }
}
