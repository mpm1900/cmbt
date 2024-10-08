import random from 'random'
import {
  Action,
  ActionAi,
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
  getDamageAiRating,
  getDamageResult,
  getMutationsFromDamageResult,
} from '../../utils'
import { PyroclashId } from '../Ids'
import { Identity } from '../Mutations'
import { GetUnits } from '../Queries'
import { Burn } from '../Statuses'

export class Pyroclash extends Action {
  recoilFactor: number = 1 / 3
  burnChance: number = 10

  constructor(sourceId: Id, teamId: Id) {
    super(PyroclashId, {
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

    const power = 110
    this.damages = [
      {
        power,
        attackType: 'physical',
        damageType: 'fire',
      },
    ]
  }

  threshold = (source: Unit): number | undefined => {
    return 95 + source.stats.accuracy
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

    const modifierFilter = (mod: Modifier) => !data.accuracyRoll.criticalSuccess
    const modifiedTargets = targets.map(
      (target) => applyModifiers(target, ctx, undefined, modifierFilter).unit
    )

    const damages = modifiedTargets.map((target) =>
      calculateDamages(this.damages, data.source, target, data.accuracyRoll)
    )
    const recoils = damages.map((damage) =>
      getDamageResult({
        target: data.source,
        evasionSuccess: damage.evasionSuccess,
        damages: [
          {
            attackType: this.damages[0].attackType,
            damage: Math.round(damage.damage * this.recoilFactor),
          },
        ],
      })
    )

    return [
      buildActionResult(this, data, source, targets, ctx, (modifiedTargets) => {
        return {
          onSuccess: {
            mutations: modifiedTargets.flatMap((target, i) => {
              const damage = damages[i]
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
      buildActionResult(this, data, source, targets, ctx, (modifiedTargets) => {
        return {
          shouldLog: false,
          expandedTargets: [data.source],
          onSuccess: {
            mutations: recoils.flatMap((recoil) => {
              return getMutationsFromDamageResult(source, source, recoil)
            }),
          },
        }
      }),
    ]
  }
}
