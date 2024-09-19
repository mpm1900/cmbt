import random from 'random'
import {
  Action,
  ActionAi,
  ActionResult,
  CombatContext,
  Damage,
  Id,
  Unit,
} from '../../types'
import {
  buildActionResult,
  calculateDamages,
  getActionData,
  getDamageAiRating,
  getMutationsFromDamageResult,
  getRandom,
} from '../../utils'
import { ChainLightningId } from '../Ids'
import { Identity } from '../Mutations'
import { GetUnits } from '../Queries'
import { Charged } from '../Statuses'

function getResults(thresholds: number[]): boolean[] {
  return thresholds.reduce<boolean[]>((prev, threshold) => {
    const roll = random.int(0, 100)
    const value = threshold > roll
    const last = prev[prev.length - 1]
    return prev.concat(last !== undefined ? value && last : value)
  }, [])
}

export class ChainLightning extends Action {
  chargeChance: number = 5
  chainDamages: Damage[]
  chainChances: [number, number] = [50, 25]
  private results: boolean[] = []

  constructor(sourceId: Id, teamId: Id) {
    super(ChainLightningId, {
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
        power: 80,
        attackType: 'magic',
        damageType: 'shock',
      },
    ]
    this.chainDamages = [
      {
        power: 40,
        attackType: 'magic',
        damageType: 'shock',
      },
      {
        power: 20,
        attackType: 'magic',
        damageType: 'shock',
      },
    ]
  }

  setResults(results: boolean[]) {
    if (this.results.length === 0) {
      this.results = results
    }
  }

  clearResults() {
    this.results = []
  }

  threshold = (source: Unit): number | undefined => {
    return 100 + source.stats.accuracy
  }
  criticalThreshold = (source: Unit): number | undefined => undefined
  criticalFactor = (source: Unit): number | undefined => undefined
  getAi(targets: Unit[], ctx: CombatContext): ActionAi {
    return getDamageAiRating(this, targets, ctx)
  }

  mapTargets = (targets: Unit[], ctx: CombatContext): Unit[] => {
    const activeEnemyUnits = ctx.units.filter(
      (u) =>
        u.flags.isActive &&
        u.teamId !== this.teamId &&
        !targets.some((t) => t.id === u.id)
    )
    this.setResults(getResults([50]))
    return [
      ...targets,
      ...this.results
        .filter(Boolean)
        .map((result) => getRandom(activeEnemyUnits)),
    ]
  }

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext
  ): ActionResult[] => {
    const data = getActionData(source, this, ctx)
    const applyModifierRoll = random.int(0, 100)
    const applyCharge = applyModifierRoll <= this.chargeChance
    const [first, ...chainTargets] = this.mapTargets(targets, ctx)

    const results = [
      buildActionResult(this, data, source, targets, ctx, (modifiedTargets) => {
        const damage = calculateDamages(
          this.damages,
          data.source,
          first,
          data.accuracyRoll
        )

        return {
          expandedTargets: [first],
          onSuccess: {
            mutations: getMutationsFromDamageResult(source, first, damage),
            addedModifiers:
              applyCharge && modifiedTargets.length > 0
                ? Charged.modifiers(source, source)
                : [],
          },
        }
      }),
      ...chainTargets.map((target, i) => {
        return buildActionResult(this, data, source, targets, ctx, () => {
          const damage = calculateDamages(
            [this.chainDamages[i]],
            data.source,
            target,
            data.accuracyRoll
          )
          return {
            expandedTargets: [target],
            onSuccess: {
              mutations: getMutationsFromDamageResult(source, target, damage),
            },
          }
        })
      }),
    ]

    this.clearResults()
    return results
  }
}
