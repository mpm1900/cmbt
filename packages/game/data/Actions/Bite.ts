import random from 'random'
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
  getDamageAiRating,
  getMutationsFromDamageResult,
} from '../../utils'
import { BiteId } from '../Ids'
import { Identity } from '../Mutations'
import { GetUnits } from '../Queries'
import { Bleed } from '../Statuses'

export class Bite extends Action {
  bleedChance: number = 100

  constructor(sourceId: Id, teamId: Id) {
    super(BiteId, {
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
        power: 45,
        attackType: 'physical',
        damageType: 'force',
      },
    ]
  }

  threshold = (source: Unit): number | undefined => {
    return 95 + source.stats.accuracy
  }
  criticalThreshold = (source: Unit): number | undefined => {
    return 5 + source.stats.criticalChance
  }
  criticalFactor = (source: Unit): number | undefined =>
    1.25 + source.stats.criticalDamage

  getAi(targets: Unit[], ctx: CombatContext): ActionAi {
    return getDamageAiRating(this, targets, ctx)
  }

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext
  ): ActionResult[] => {
    const data = getActionData(source, this, ctx)
    const applyModifierRoll = random.int(0, 100)
    const applyBleed = applyModifierRoll <= this.bleedChance

    return [
      buildActionResult(this, data, source, targets, ctx, (modifiedTargets) => {
        return {
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
            addedModifiers:
              applyBleed && modifiedTargets.length > 0
                ? modifiedTargets.flatMap((target) =>
                    Bleed.modifiers(source, target)
                  )
                : [],
          },
        }
      }),
    ]
  }
}
