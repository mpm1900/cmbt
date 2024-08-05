import {
  Action,
  ActionId,
  ActionRenderOptions,
  ActionResult,
  CombatContext,
  Id,
  Unit,
} from '../../types'
import { applyModifiers, getActionData, parseSuccess } from '../../utils'
import { modifyRenderContext } from '../../utils/modifyRenderContext'
import { DamageParent, Identity } from '../Mutations'
import { GetUnits } from '../Queries'

export const PowerWordKillId = ActionId()
export class PowerWordKill extends Action {
  constructor(sourceId: Id, teamId: Id) {
    super(PowerWordKillId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      targets: new GetUnits({
        notTeamId: teamId,
        isActive: true,
      }),
      attackType: 'magic',
      maxTargetCount: 1,
    })
  }

  threshold = (source: Unit): number | undefined => {
    return 40 + source.stats.accuracy
  }
  critical = (source: Unit): number | undefined => undefined

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext,
    options?: ActionRenderOptions
  ): ActionResult => {
    if (options?.disableLogging) {
      ctx = { ...ctx, log: () => {} }
    }
    ctx = modifyRenderContext(options, ctx)
    const data = getActionData(source, this, ctx)
    return parseSuccess(this, data, source, targets, {
      onSuccess: {
        mutations: targets
          .map((target) => [target, applyModifiers(target, ctx).unit])
          .map(([target, modifiedTarget]) => {
            const damage = modifiedTarget.stats.health
            return new DamageParent({
              sourceId: source.id,
              parentId: target.id,
              damage,
            })
          }),
        addedModifiers: [],
      },
      onFailure: {},
    })
  }
}
