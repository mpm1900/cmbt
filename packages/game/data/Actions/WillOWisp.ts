import {
  Action,
  ActionId,
  ActionRenderOptions,
  ActionResult,
  GameContext,
  Id,
  Unit,
} from '../../types'
import { getActionData, parseSuccess } from '../../utils'
import { modifyRenderContext } from '../../utils/modifyRenderContext'
import { PowerDownParent, BurnedPowerDownId } from '../Modifiers'
import { ReduceFocusParent, SetLastUsedAction } from '../Mutations'
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
    return 70 + source.stats.accuracy
  }
  critical = (source: Unit): number | undefined => undefined

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: GameContext,
    options: ActionRenderOptions
  ): ActionResult => {
    ctx = modifyRenderContext(options, ctx)
    const data = getActionData(source, this, ctx)
    return parseSuccess(this, data, source, targets, {
      onSuccess: {
        mutations: [
          new SetLastUsedAction({
            sourceId: this.sourceId,
            parentId: this.sourceId,
            actionId: this.id,
          }),
        ],
        addedModifiers: targets.flatMap((target) => [
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
      onFailure: {},
    })
  }
}
