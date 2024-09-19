import {
  Action,
  ActionResult,
  CombatContext,
  Damage,
  Id,
  Unit,
} from '../../types'
import { buildActionResult, getActionData } from '../../utils'
import { SpikesId } from '../Ids'
import { Identity } from '../Mutations'
import { EmptyArray } from '../Queries/EmptyArray'
import { DamageNewUnitsOnUnitEnter } from '../Triggers'

export class Spikes extends Action {
  spikeDamage: Damage

  constructor(sourceId: Id, teamId: Id) {
    super(SpikesId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      targets: new EmptyArray(),
      maxTargetCount: 0,
    })

    this.spikeDamage = {
      attackType: 'physical',
      damageType: 'force',
      factor: 1 / 8,
    }
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
            new DamageNewUnitsOnUnitEnter({
              sourceId: source.id,
              maxInstances: 3,
              damage: this.spikeDamage,
            }),
          ],
        },
      })),
    ]
  }
}
