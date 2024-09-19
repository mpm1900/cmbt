import {
  Action,
  ActionAi,
  ActionResult,
  CombatContext,
  Id,
  Unit,
} from '../../types'
import {
  buildActionResult,
  calculateDamages,
  getActionData,
  getMutationsFromDamageResult,
} from '../../utils'
import { getDamageAiRating } from '../../utils/getDamageAiRating'
import { BecomeTheStormId, StunnedParentId } from '../Ids'
import { UpdateFlagParent } from '../Modifiers'
import { Identity } from '../Mutations'
import { GetUnits } from '../Queries'

export class BecomeTheStorm extends Action {
  stunDuration: number = 2

  constructor(sourceId: Id, teamId: Id) {
    super(BecomeTheStormId, {
      sourceId,
      teamId,
      cost: new Identity(),
      targets: new GetUnits({
        notTeamId: teamId,
        isActive: true,
        isHidden: false,
      }),
      maxTargetCount: 1,
    })

    this.damages = [
      {
        power: 150,
        attackType: 'magic',
        damageType: 'shock',
      },
    ]
  }

  threshold = (source: Unit): number | undefined => 95 + source.stats.accuracy
  criticalThreshold = (source: Unit): number | undefined => 5
  criticalFactor = (source: Unit): number | undefined => 1.25
  getAi(targets: Unit[], ctx: CombatContext): ActionAi {
    return getDamageAiRating(this, targets, ctx)
  }

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext
  ): ActionResult[] => {
    const data = getActionData(source, this, ctx)

    return [
      buildActionResult(
        this,
        data,
        source,
        targets,
        ctx,
        (modifiedTargets) => ({
          onSuccess: {
            mutations: modifiedTargets.flatMap((target) => {
              const damage = calculateDamages(
                this.damages,
                data.source,
                target,
                data.accuracyRoll
              )
              return getMutationsFromDamageResult(source, target, damage)
            }),
            addedModifiers: [
              new UpdateFlagParent({
                registryId: StunnedParentId,
                sourceId: source.id,
                parentId: source.id,
                flag: 'isStunned',
                value: true,
                duration: 2,
              }),
            ],
          },
        })
      ),
    ]
  }
}
