import {
  Action,
  ActionAi,
  ActionResult,
  CombatContext,
  Id,
  Unit,
} from '../../../types'
import { getModifiersFromUnit } from '../../../utils'
import { SwitchUnitId } from '../../Ids'
import { Identity } from '../../Mutations'
import { AddModifiersToParent, SetIsActiveParent } from '../../Mutations/system'
import { GetUnits } from '../../Queries'

export class SwitchUnit extends Action {
  constructor(sourceId: Id, teamId: Id) {
    super(SwitchUnitId, {
      sourceId,
      teamId,
      priority: 2,
      cost: new Identity(),
      targets: new GetUnits({
        teamId: teamId,
        isActive: false,
        isAlive: true,
      }),
      maxTargetCount: 1,
    })
  }

  threshold = (source: Unit): number | undefined => undefined
  criticalThreshold = (source: Unit): number | undefined => undefined
  getAi(targets: Unit[], ctx: CombatContext): ActionAi {
    return { action: this, weight: 0, targetIds: [] }
  }

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext
  ): ActionResult => {
    const target = targets[0]
    if (!target) throw new Error('No target for SwitchUnit action.')
    return {
      action: this,
      source,
      targets,
      mutations: [
        new SetIsActiveParent({
          sourceId: source.id,
          parentId: source.id,
          isActive: false,
        }),
        new SetIsActiveParent({
          sourceId: source.id,
          parentId: target.id,
          isActive: true,
        }),
        new AddModifiersToParent({
          sourceId: source.id,
          parentId: source.id,
          modifiers: ctx.modifiers.filter(
            (m) => m.parentId === source.id && m.persistOnSwitch
          ),
        }),
      ],
      addedModifiers: getModifiersFromUnit(target),
      addedUnits: [target],
      removedUnits: [source],
      /* below is for baton pass
      updateModifiers: (modifiers) => {
        return modifiers
          .map((modifier) => {
            if (modifier.parentId === this.sourceId) {
              modifier.parentId = target.id
            }
            return modifier
          })
      },
       */

      // change targets from old unit to new unit
      updateActionQueue: (queue) => {
        return queue.map((item) => {
          if (item.targetIds.includes(this.sourceId)) {
            item.targetIds = item.targetIds.map((id) =>
              id === this.sourceId ? target.id : id
            )
          }
          return item
        })
      },
    }
  }
}
