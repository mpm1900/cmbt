import { Action, ActionResult, CombatContext, Id, Unit } from '../../types'
import { buildActionResult, getActionData } from '../../utils'
import { LayOnHandsId } from '../Ids'
import { HealParent, Identity } from '../Mutations'
import { GetUnits } from '../Queries'

export class LayOnHands extends Action {
  healthFactor = 0.25

  constructor(sourceId: Id, teamId: Id) {
    super(LayOnHandsId, {
      sourceId,
      teamId,
      cost: new Identity({}),
      targets: new GetUnits({
        notId: sourceId,
        teamId: teamId,
      }),
      maxTargetCount: 1,
    })

    this.damages = []
  }

  resolve(source: Unit, targets: Unit[], ctx: CombatContext): ActionResult[] {
    const data = getActionData(source, this, ctx)

    return [
      buildActionResult(this, data, source, targets, ctx, (modifiedTargets) => {
        return {
          onSuccess: {
            mutations: modifiedTargets.flatMap((target) => {
              const targetStatuses = ctx.modifiers.filter(
                (m) => m.parentId === target.id && m.statusId
              )
              if (targetStatuses.length === 0) {
                return [
                  new HealParent({
                    sourceId: source.id,
                    parentId: target.id,
                    healthFactor: this.healthFactor,
                  }),
                ]
              }
              return []
            }),
            updateModifiers: (modifiers) =>
              modifiers.filter(
                (m) =>
                  !m.statusId ||
                  !modifiedTargets.some((t) => t.id === m.parentId)
              ),
          },
        }
      }),
    ]
  }
}
