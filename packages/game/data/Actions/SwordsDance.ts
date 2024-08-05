import {
  Action,
  ActionId,
  ActionRenderOptions,
  ActionResult,
  CombatContext,
  Id,
  Unit,
} from '../../types'
import { getActionData } from '../../utils'
import { modifyRenderContext } from '../../utils/modifyRenderContext'
import { PowerUpParent } from '../Modifiers'
import { ReduceFocusParent, SetLastUsedAction } from '../Mutations'
import { EmptyArray } from '../Queries/EmptyArray'

export const SwordsDanceId = ActionId()
export class SwordsDance extends Action {
  constructor(sourceId: Id, teamId: Id) {
    super(SwordsDanceId, {
      sourceId,
      teamId,
      cost: new ReduceFocusParent({
        sourceId: sourceId,
        parentId: sourceId,
        offset: 30,
      }),

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
    ctx: CombatContext,
    options: ActionRenderOptions
  ): ActionResult => {
    ctx = modifyRenderContext(options, ctx)
    const data = getActionData(source, this, ctx)
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
