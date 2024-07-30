import {
  Action,
  ActionId,
  ActionResult,
  GameContext,
  Id,
  Unit,
} from '../../types'
import { AddActionToRegistryParent, Identity } from '../Modifiers'
import { SetLastUsedAction } from '../Modifiers/system'

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

  targets = (unit: Unit, ctx: GameContext): boolean => {
    return super.targets(unit, ctx) && unit.teamId !== this.teamId
  }

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
      modifiers: targets.map((target) => {
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
