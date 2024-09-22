import {
  Action,
  ActionResult,
  CombatContext,
  Id,
  Modifier,
  Unit,
} from '../../types'
import {
  applyModifiers,
  buildActionResult,
  calculateDamages,
  getActionData,
  getMutationsFromDamageResult,
} from '../../utils'
import { VampiricTouchId } from '../Ids'
import { HealParent, Identity } from '../Mutations'
import { GetUnits } from '../Queries'

export class VampiricTouch extends Action {
  drainFactor = 0.5

  constructor(sourceId: Id, teamId: Id) {
    super(VampiricTouchId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      targets: new GetUnits({
        notTeamId: teamId,
        isActive: true,
        isHidden: false,
      }),
      maxTargetCount: 1,
    })

    this.damages = [
      {
        power: 55,
        attackType: 'magic',
        damageType: 'blight',
      },
    ]
  }

  threshold = (source: Unit): number | undefined => {
    return 95 + source.stats.accuracy
  }

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext
  ): ActionResult[] => {
    const data = getActionData(source, this, ctx)

    const modifierFilter = (mod: Modifier) => !data.accuracyRoll.criticalSuccess
    const modifiedTargets = targets
      .map(
        (target) => applyModifiers(target, ctx, undefined, modifierFilter).unit
      )
      .filter((t) => !t.flags.isProtected)

    const damages = modifiedTargets.map((target) => ({
      target,
      damage: calculateDamages(
        this.damages,
        data.source,
        target,
        data.accuracyRoll
      ),
    }))

    const drains = damages.map(
      ({ target, damage }) =>
        (Math.min(damage.damage, target.stats.health) +
          damage.magicArmor +
          damage.physicalArmor) *
        this.drainFactor
    )

    return [
      buildActionResult(this, data, source, targets, ctx, (modifiedTargets) => {
        return {
          onSuccess: {
            mutations: damages.flatMap(({ damage, target }, i) => {
              return getMutationsFromDamageResult(source, target, damage)
            }),
          },
        }
      }),

      buildActionResult(this, data, source, targets, ctx, (modifiedTargets) => {
        return {
          forceFailure: damages.length === 0,
          shouldLog: false,
          expandedTargets: [data.source],
          onSuccess: {
            mutations: drains.map((drain) => {
              return new HealParent({
                sourceId: source.id,
                parentId: source.id,
                static: drain,
              })
            }),
          },
        }
      }),
    ]
  }
}
