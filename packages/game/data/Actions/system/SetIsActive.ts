import {
  Action,
  ActionId,
  ActionResult,
  AiAction,
  GameContext,
  Id,
  Unit,
} from '../../../types'
import {
  applyModifiers,
  getModifiersFromUnit,
  isUnitAliveCtx,
} from '../../../utils'
import { Identity, SetIsActiveParent } from '../../Mutations'
import { GetUnits } from '../../Queries'

export const SetIsActiveId = ActionId()
export class SetIsActive extends Action {
  maxTargetCount: number = 1

  constructor(sourceId: Id, teamId: Id) {
    super(SetIsActiveId, {
      sourceId,
      teamId,
      cost: new Identity(),
      attackType: 'physical',
    })
  }

  targets = new GetUnits({
    teamId: this.teamId,
    isActive: false,
    isAlive: true,
  })
  threshold = (source: Unit): number | undefined => undefined
  critical = (source: Unit): number | undefined => undefined

  getAiAction = (targets: Unit[], ctx: GameContext): AiAction => {
    const target = targets[0]
    const modified = applyModifiers(target, ctx)
    const remainingHealth =
      modified.unit.stats.health - modified.unit.values.damage

    return {
      action: this,
      targetIds: targets.map((t) => t.id),
      weight: remainingHealth,
    }
  }

  resolve = (source: Unit, targets: Unit[], ctx: GameContext): ActionResult => {
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
          isActive: true,
        }),
      ],
      addedModifiers: [],
      addedUnits: [target],
      updateModifiers: (modifiers) => {
        return modifiers.concat(...getModifiersFromUnit(target))
      },
    }
  }
}
