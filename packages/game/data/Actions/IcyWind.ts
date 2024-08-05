import {
  Action,
  ActionResult,
  AiAction,
  CombatContext,
  Id,
  Unit,
} from '../../types'
import { ActionId } from '../Id'
import { SpeedOffsetParent } from '../Modifiers'
import { Identity } from '../Mutations'
import { SetLastUsedAction } from '../Mutations/system'
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
  getAiAction(targets: Unit[], ctx: CombatContext): AiAction {
    return { action: this, weight: 0, targetIds: [] }
  }

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext
  ): ActionResult => {
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
