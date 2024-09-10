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

  threshold = (source: Unit): number | undefined => undefined
  criticalThreshold = (source: Unit): number | undefined => undefined

  getAi = (targets: Unit[], ctx: CombatContext): ActionAi => {
    const modified = targets.map((target) => applyModifiers(target, ctx).unit)
    const remainingHealth = modified.map(
      (unit) => unit.stats.health - unit.values.damage
    )

    return {
      action: this,
      targetIds: targets.map((t) => t.id),
      weight: remainingHealth.reduce((a, b) => a + b, 0),
    }
  }

  resolve = (
    source: Unit | undefined,
    targets: Unit[],
    ctx: CombatContext
  ): ActionResult => {
    return {
      action: this,
      source,
      targets,
      mutations: targets.map(
        (t) =>
          new SetIsActiveParent({
            sourceId: source?.id,
            parentId: t.id,
            isActive: true,
          })
      ),
      addedModifiers: [],
      addedUnits: targets,
      updateModifiers: (modifiers) => {
        const targetsModifiers = targets.flatMap((t) => getModifiersFromUnit(t))
        return modifiers.concat(...targetsModifiers)
      },
    }
  }
}
