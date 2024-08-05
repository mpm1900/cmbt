import {
  Action,
  ActionId,
  ActionResult,
  CombatContext,
  Id,
  Unit,
} from '../../../types'
import { getModifiersFromUnit, isUnitAliveCtx } from '../../../utils'
import {
  AddModifiersToParent,
  Identity,
  SetIsActiveParent,
} from '../../Mutations'
import { GetUnits } from '../../Queries'

export const SwitchUnitId = ActionId()
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
      attackType: 'physical',
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
            (m) => m.parentId === source.id && m.persist
          ),
        }),
      ],
      addedModifiers: getModifiersFromUnit(target),
      addedUnits: [target],
      updateModifiers: (modifiers) => {
        return (
          modifiers
            // filter out modifiers for unit going inactive
            .filter((m) => m.parentId !== source.id)
        )

        /* below is for baton pass
            .map((modifier) => {
              if (modifier.parentId === this.sourceId) {
                modifier.parentId = target.id
              }
              return modifier
            })
              */
      },
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
