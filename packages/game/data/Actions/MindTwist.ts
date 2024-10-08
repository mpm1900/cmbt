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
import { MagicStageDownParentId, MindTwistId } from '../Ids'
import { UpdateStatStageParent } from '../Modifiers'
import { Identity } from '../Mutations'
import { GetUnits } from '../Queries'

export class MindTwist extends Action {
  magicDownChance = 20
  magicStage = -1

  constructor(sourceId: Id, teamId: Id) {
    super(MindTwistId, {
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
        power: 85,
        attackType: 'magic',
        damageType: 'psychic',
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
    const applyMagicDown = applyModifierRoll <= this.magicDownChance

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
              applyMagicDown && modifiedTargets.length > 0,
              modifiedTargets.map(
                (target) =>
                  new UpdateStatStageParent({
                    registryId: MagicStageDownParentId,
                    stat: 'magic',
                    sourceId: source.id,
                    parentId: target.id,
                    stages: this.magicStage,
                  })
              )
            ),
          },
        }
      }),
    ]
  }
}
