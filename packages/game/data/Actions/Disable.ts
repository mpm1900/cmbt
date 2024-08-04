import {
  Action,
  ActionId,
  ActionResult,
  GameContext,
  Id,
  Unit,
} from '../../types'
import { AddActionToRegistryParent } from '../Modifiers'
import { Identity, SetLastUsedAction } from '../Mutations'
import { GetUnits } from '../Queries'

export const DisableId = ActionId()
export class Disable extends Action {
  maxTargetCount: number = 1

  constructor(sourceId: Id, teamId: Id) {
    super(DisableId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      priority: -1,
      attackType: 'magic',
    })
  }

  threshold = (source: Unit): number | undefined => undefined
  critical = (source: Unit): number | undefined => undefined
  targets = new GetUnits({ isActive: true, notTeamId: this.sourceId })

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
      addedModifiers: targets.map((target) => {
        return new AddActionToRegistryParent({
          sourceId: source.id,
          parentId: target.id,
          actionId: target.metadata.lastUsedActionId,
          duration: 2,
        })
      }),
    }
  }
}
