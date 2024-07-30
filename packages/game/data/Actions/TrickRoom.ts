import {
  Action,
  ActionId,
  ActionResult,
  GameContext,
  Id,
  Unit,
} from '../../types'
import { Identity, InvertSpeedAll } from '../Modifiers'
import { SetLastUsedAction } from '../Modifiers/system'

export const TrickRoomId = ActionId()

export class TrickRoom extends Action {
  maxTargetCount: number = 0

  constructor(sourceId: Id, teamId: Id) {
    super(TrickRoomId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      attackType: 'magic',
    })
  }

  targets = (unit: Unit): boolean => {
    return false
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
      modifiers: [new InvertSpeedAll({ sourceId: source.id })],
    }
  }
}
