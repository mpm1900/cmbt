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
import { InfernalBlastId } from '../Ids'
import { Identity } from '../Mutations'
import { GetUnits } from '../Queries'
import { Burn } from '../Statuses/Burn'

export class InfernalBlast extends Action {
  burnChance: number = 10

  constructor(sourceId: Id, teamId: Id) {
    super(InfernalBlastId, {
      sourceId,
      teamId,
      cost: new Identity({}),
      targets: new GetUnits({
        notTeamId: teamId,
        isActive: true,
        isHidden: false,
      }),
      maxTargetCount: 1,
    })

    this.damages = [
      {
        power: 110,
        attackType: 'magic',
        damageType: 'fire',
      },
    ]
  }

  threshold = (source: Unit): number | undefined => {
    return 75 + source.stats.accuracy
  }
  criticalThreshold = (source: Unit): number | undefined => undefined
  criticalFactor = (source: Unit): number | undefined => undefined
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
    const applyBurn = applyModifierRoll <= this.burnChance

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
            addedModifiers: applyBurn
              ? modifiedTargets.flatMap((target) =>
                  Burn.modifiers(source, target)
                )
              : [],
          },
        }
      }),
    ]
  }
}
