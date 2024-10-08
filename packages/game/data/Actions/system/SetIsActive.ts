import { nanoid } from 'nanoid'
import {
  Action,
  ActionAi,
  ActionResult,
  CombatContext,
  Id,
  Unit,
} from '../../../types'
import { applyModifiers, getModifiersFromUnit } from '../../../utils'
import { SetIsActiveId } from '../../Ids'
import { Identity } from '../../Mutations'
import { SetIsActiveParent } from '../../Mutations/system'
import { GetUnitsForCleanupActive } from '../../Queries/GetUnitsForCleanupActive'

export class SetIsActive extends Action {
  constructor(teamId: Id, maxTargetCount: number) {
    super(SetIsActiveId, {
      sourceId: '',
      teamId,
      cost: new Identity(),
      targets: new GetUnitsForCleanupActive({
        teamId: teamId,
        isActive: false,
        isAlive: true,
      }),
      maxTargetCount,
    })
  }

  getAi = (targets: Unit[], ctx: CombatContext): ActionAi => {
    const modified = targets.map((target) => applyModifiers(target, ctx).unit)
    const remainingHealth = modified.map(
      (unit) => unit.stats.health - unit.values.damage
    )

    return {
      id: nanoid(),
      action: this,
      targetIds: targets.map((t) => t.id),
      weight: remainingHealth.reduce((a, b) => a + b, 0),
    }
  }

  resolve = (
    source: Unit | undefined,
    targets: Unit[],
    ctx: CombatContext
  ): ActionResult[] => {
    return [
      {
        id: nanoid(),
        action: this,
        shouldLog: true,
        source,
        targets,
        mutations: targets.map(
          (target) =>
            new SetIsActiveParent({
              sourceId: source?.id,
              parentId: target.id,
              isActive: true,
            })
        ),
        addedModifiers: targets.flatMap((t) => getModifiersFromUnit(t)),
        addedUnits: targets,
        updateActionQueue: (queue) => {
          const target = targets[0]
          return queue.map((item) => {
            return {
              ...item,
              targetIds: item.targetIds.map((tid) =>
                tid === '' ? target.id : tid
              ),
            }
          })
        },
      },
    ]
  }
}
