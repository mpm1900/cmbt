import { nanoid } from 'nanoid'
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
  applyModifiers,
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
        power: 70,
        attackType: 'magic',
        damageType: 'shock',
      },
    ]
    this.chainDamages = [
      {
        power: 20,
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

  threshold = (source: Unit): number | undefined => {
    return 100 + source.stats.accuracy
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
    const applyCharge = applyModifierRoll <= this.chargeChance
    const enemyUnits = ctx.units.filter(
      (u) => u.flags.isActive && u.teamId !== this.teamId
    )
    const modifiedTargets = targets.map((t) => applyModifiers(t, ctx).unit)
    const baseTargets = this.mapTargets(modifiedTargets, ctx)
    const modifiedEnemyUnits = enemyUnits.map(
      (u) => applyModifiers(u, ctx).unit
    )
    const availableEnemyUnits = modifiedEnemyUnits.filter(
      (u) => !targets.some((t) => t.id === u.id)
    )

    const success =
      data.source.flags.isBlessed ||
      (data.accuracyRoll.success &&
        !data.source.flags.isBaned &&
        this.filter(data.source, ctx))

    const randomResults = getResults([success ? 100 : 0, ...this.chainChances])

    const results = randomResults.map<ActionResult>((s, i) => {
      const resultTargets =
        i === 0 ? baseTargets : [getRandom(availableEnemyUnits)]

      const protectedTargets = resultTargets.filter((t) => t.flags.isProtected)
      const expandedTargets = resultTargets.filter((t) => !t.flags.isProtected)

      return {
        id: nanoid(),
        data,
        shouldLog: true,
        success: s,
        action: this,
        source,
        targets: expandedTargets,
        protectedTargets,
        expandedTargets,
        mutations: expandedTargets.flatMap((t) => {
          const damages = i === 0 ? this.damages : [this.chainDamages[i - 1]]
          const damage = calculateDamages(
            damages,
            data.source,
            t,
            data.accuracyRoll
          )
          return getMutationsFromDamageResult(source, t, damage)
        }),
        addedModifiers:
          applyCharge && s && i === 0 && modifiedTargets.length > 0
            ? Charged.modifiers(source, source)
            : [],
      }
    })

    return results
  }
}
