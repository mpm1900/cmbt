import {
  Action,
  ActionId,
  ActionResult,
  GameContext,
  Id,
  Unit,
} from '../../types'
import { Identity } from '../Modifiers'
import { SetLastUsedAction } from '../Modifiers/system'
import { DamageAllOnTurnEnd } from '../Triggers'

export const SandstormId = ActionId()

export class Sandstorm extends Action {
  maxTargetCount: number = 0

  constructor(sourceId: Id, teamId: Id) {
    super(SandstormId, {
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
      modifiers: [
        new DamageAllOnTurnEnd({
          sourceId: source.id,
          damage: 10,
          duration: 5,
          maxInstances: 1,
        }),
      ],
    }
  }
}
