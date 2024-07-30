import {
  Action,
  ActionId,
  ActionResult,
  GameContext,
  Id,
  Unit,
} from '../../types'
import { Identity, SpeedOffsetParent } from '../Modifiers'
import { SetLastUsedAction } from '../Modifiers/system'

export const IcyWindId = ActionId()
export class IcyWind extends Action {
  maxTargetCount: number = 1

  constructor(sourceId: Id, teamId: Id) {
    super(IcyWindId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      attackType: 'magic',
    })
  }

  targets = (unit: Unit, ctx: GameContext): boolean => {
    return super.targets(unit, ctx) && unit.teamId !== this.teamId
  }

  threshold = (source: Unit): number | undefined => undefined
  critical = (source: Unit): number | undefined => undefined

  resolve = (source: Unit, targets: Unit[], ctx: GameContext): ActionResult => {
    return {
      action: this,
      source,
      targets,
      mutations: [
        new SetLastUsedAction({
          sourceId: this.sourceId,
          parentId: this.sourceId,
          actionId: this.id,
        }),
      ],
      modifiers: targets.map(
        (target) =>
          new SpeedOffsetParent({
            sourceId: source.id,
            parentId: target.id,
            offset: -10,
          })
      ),
    }
  }
}
