import {
  Action,
  ActionId,
  ActionRenderOptions,
  ActionRenderResult,
  GameContext,
  Id,
  Unit,
} from '../../types'
import { getActionData } from '../../utils'
import { modifyRenderContext } from '../../utils/modifyRenderContext'
import { PowerUpParent } from '../Modifiers'
import { ReduceFocusParent } from '../Modifiers/costs'
import { SetLastUsedAction } from '../Modifiers/system'

export const SwordsDanceId = ActionId()
export class SwordsDance extends Action {
  maxTargetCount = 0

  constructor(sourceId: Id, teamId: Id) {
    super(SwordsDanceId, {
      sourceId,
      teamId,
      cost: new ReduceFocusParent({
        sourceId: sourceId,
        offset: 30,
      }),
      attackType: 'magic',
    })
  }

  checkCost = (source: Unit): boolean => {
    return source.values.focus >= 30
  }

  targets = (unit: Unit): boolean => {
    return false
  }

  threshold = (source: Unit): number | undefined => undefined
  critical = (source: Unit): number | undefined => undefined

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: GameContext,
    options: ActionRenderOptions
  ): ActionRenderResult => {
    ctx = modifyRenderContext(options, ctx)
    const data = getActionData(source, this, ctx)
    return {
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
        new PowerUpParent({
          sourceId: source.id,
          parentId: source.id,
          coef: 1.5,
          maxInstances: 6,
        }),
      ],
    }
  }
}
