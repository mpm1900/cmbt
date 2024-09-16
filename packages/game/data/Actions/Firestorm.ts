import { Action, ActionResult, CombatContext, Id, Unit } from '../../types'
import { buildActionResult, getActionData } from '../../utils'
import { FirestormId, FirestormOnTurnEndId } from '../Ids'
import { Identity } from '../Mutations'
import { EmptyArray } from '../Queries/EmptyArray'
import { DamageAllOnTurnEnd } from '../Triggers'

export class Firestorm extends Action {
  duration: number = 5
  damageFactor = 0.1

  constructor(sourceId: Id, teamId: Id) {
    super(FirestormId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      targets: new EmptyArray(),
      maxTargetCount: 0,
    })
  }

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext
  ): ActionResult[] => {
    const data = getActionData(source, this, ctx)

    return [
      buildActionResult(this, data, source, targets, ctx, () => ({
        onSuccess: {
          addedModifiers: [
            new DamageAllOnTurnEnd({
              registryId: FirestormOnTurnEndId,
              sourceId: source.id,
              damage: {
                factor: this.damageFactor,
                attackType: 'magic',
                damageType: 'fire',
              },
              duration: this.duration,
              maxInstances: 1,
            }),
          ],
        },
      })),
    ]
  }
}
