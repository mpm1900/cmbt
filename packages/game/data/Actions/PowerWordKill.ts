import {
  Action,
  ActionId,
  ActionRenderOptions,
  ActionResult,
  GameContext,
  Id,
  Unit,
} from '../../types'
import {
  applyModifiers,
  calculateDamage,
  getActionData,
  parseSuccess,
} from '../../utils'
import { modifyRenderContext } from '../../utils/modifyRenderContext'
import { DamageParent, Identity } from '../Modifiers'

export const PowerWordKillId = ActionId()
export class PowerWordKill extends Action {
  maxTargetCount: number = 1

  constructor(sourceId: Id, teamId: Id) {
    super(PowerWordKillId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      attackType: 'magic',
    })
  }

  targets = (unit: Unit, ctx: GameContext): boolean => {
    return super.targets(unit, ctx) && unit.teamId !== this.teamId
  }

  threshold = (source: Unit): number | undefined => {
    return 30 + source.stats.accuracy
  }
  critical = (source: Unit): number | undefined => undefined

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: GameContext,
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
        modifiers: [],
      },
      onFailure: {},
    })
  }
}
