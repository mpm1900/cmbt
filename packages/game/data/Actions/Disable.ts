import {
  Action,
  ActionResult,
  ActionAi,
  CombatContext,
  Id,
  Unit,
} from '../../types'
import { ActionId } from '../Id'
import { AddActionToRegistryParent } from '../Modifiers'
import { Identity } from '../Mutations'
import { SetLastUsedAction } from '../Mutations/system'
import { GetUnits } from '../Queries'

export const DisableId = ActionId()
export class Disable extends Action {
  constructor(sourceId: Id, teamId: Id) {
    super(DisableId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      targets: new GetUnits({ isActive: true, notTeamId: teamId }),
      priority: -1,
      attackType: 'magic',
      maxTargetCount: 1,
    })
  }

  threshold = (source: Unit): number | undefined => undefined
  critical = (source: Unit): number | undefined => undefined

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
