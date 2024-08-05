import {
  Action,
  ActionResult,
  AiAction,
  CombatContext,
  Id,
  Unit,
} from '../../types'
import { ActionId } from '../Id'
import { InvertSpeedAll } from '../Modifiers'
import { Identity } from '../Mutations'
import { SetLastUsedAction } from '../Mutations/system'
import { EmptyArray } from '../Queries/EmptyArray'

export const TrickRoomId = ActionId()

export class TrickRoom extends Action {
  constructor(sourceId: Id, teamId: Id) {
    super(TrickRoomId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      targets: new EmptyArray(),
      attackType: 'magic',
      maxTargetCount: 0,
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
      addedModifiers: [new InvertSpeedAll({ sourceId: source.id })],
    }
  }
}
