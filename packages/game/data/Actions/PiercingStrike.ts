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
  ifArray,
} from '../../utils'
import { DefenseStageDownParentId, PiercingStrikeId } from '../Ids'
import { UpdateStatStageParent } from '../Modifiers'
import { Identity } from '../Mutations'
import { GetUnits } from '../Queries'

export class PiercingStrike extends Action {
  defenseDownChance: number = 20
  defenseStage: number = -1

  constructor(sourceId: Id, teamId: Id) {
    super(PiercingStrikeId, {
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
        power: 80,
        attackType: 'physical',
        damageType: 'force',
      },
    ]
  }

  threshold = (source: Unit): number | undefined => {
    return 90 + source.stats.accuracy
  }
  criticalThreshold = (source: Unit): number | undefined => {
    return 5 + source.stats.criticalChance
  }
  criticalFactor = (source: Unit): number | undefined =>
    1.5 + source.stats.criticalDamage

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
    const applyDefenseDown = applyModifierRoll <= this.defenseDownChance

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
            addedModifiers: ifArray(
              applyDefenseDown,
              modifiedTargets.map(
                (target) =>
                  new UpdateStatStageParent({
                    registryId: DefenseStageDownParentId,
                    stat: 'defense',
                    sourceId: source.id,
                    parentId: target.id,
                    stages: this.defenseStage,
                  })
              )
            ),
          },
        }
      }),
    ]
  }
}
