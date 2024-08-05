import {
  Action,
  ActionId,
  ActionResult,
  GameContext,
  Id,
  Unit,
} from '../../types'
import { SpeedOffsetParent } from '../Modifiers'
import { Identity, SetLastUsedAction } from '../Mutations'
import { GetUnits } from '../Queries'

export const IcyWindId = ActionId()
export class IcyWind extends Action {
  constructor(sourceId: Id, teamId: Id) {
    super(IcyWindId, {
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
      addedModifiers: targets.map(
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
