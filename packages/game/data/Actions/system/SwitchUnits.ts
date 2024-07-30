import {
  Action,
  ActionId,
  ActionResult,
  GameContext,
  Id,
  Unit,
} from '../../../types'
import { getModifiersFromUnit, isUnitAliveCtx } from '../../../utils'
import { SetIsActiveParent, Identity } from '../../Modifiers'

export const SwitchUnitId = ActionId()
export class SwitchUnit extends Action {
  maxTargetCount: number = 1

  constructor(sourceId: Id, teamId: Id) {
    super(SwitchUnitId, {
      sourceId,
      teamId,
      priority: 2,
      cost: new Identity({}),
      attackType: 'physical',
    })
  }

  targets = (unit: Unit, ctx: GameContext): boolean => {
    return (
      unit.id !== this.sourceId &&
      unit.teamId === this.teamId &&
      unit.flags.isActive === false &&
      isUnitAliveCtx(unit.id, ctx)
    )
  }

  threshold = (source: Unit): number | undefined => undefined
  critical = (source: Unit): number | undefined => undefined

  resolve = (source: Unit, targets: Unit[], ctx: GameContext): ActionResult => {
    const target = targets[0]
    if (!target) throw new Error('No target for SwitchUnit action.')
    return {
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
      ],
      modifiers: getModifiersFromUnit(target),
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
