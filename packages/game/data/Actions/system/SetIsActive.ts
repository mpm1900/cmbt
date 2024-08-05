import {
  Action,
  ActionResult,
  AiAction,
  CombatContext,
  Id,
  Unit,
} from '../../../types'
import { applyModifiers, getModifiersFromUnit } from '../../../utils'
import { ActionId } from '../../Id'
import { Identity } from '../../Mutations'
import { SetIsActiveParent } from '../../Mutations/system'
import { GetUnits } from '../../Queries'

export const SetIsActiveId = ActionId()
export class SetIsActive extends Action {
  constructor(sourceId: Id, teamId: Id, maxTargetCount = 1) {
    super(SetIsActiveId, {
      sourceId,
      teamId,
      cost: new Identity(),
      targets: new GetUnits({
        teamId: teamId,
        isActive: false,
        isAlive: true,
      }),
      attackType: 'physical',
      maxTargetCount,
    })
  }

  threshold = (source: Unit): number | undefined => undefined
  critical = (source: Unit): number | undefined => undefined

  getAiAction = (targets: Unit[], ctx: CombatContext): AiAction => {
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
