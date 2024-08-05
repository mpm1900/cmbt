import {
  Action,
  ActionId,
  ActionResult,
  CombatContext,
  Id,
  Unit,
} from '../../types'
import { Identity, SetLastUsedAction } from '../Mutations'
import { EmptyArray } from '../Queries/EmptyArray'
import { DamageAllOnTurnEnd } from '../Triggers'

export const SandstormId = ActionId()

export class Sandstorm extends Action {
  constructor(sourceId: Id, teamId: Id) {
    super(SandstormId, {
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
      addedModifiers: [
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
