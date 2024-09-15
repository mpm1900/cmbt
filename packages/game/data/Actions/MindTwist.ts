import random from 'random'
import {
  Action,
  ActionAi,
  ActionResolveOptions,
  ActionResult,
  CombatContext,
  Damage,
  Id,
  Unit,
} from '../../types'
import {
  buildActionResult,
  calculateDamage,
  getActionData,
  getDamageAi,
  getMutationsFromDamageResult,
  ifArray,
} from '../../utils'
import { modifyRenderContext } from '../../utils/modifyRenderContext'
import { MagicStageDownParentId, MindTwistId } from '../Ids'
import { UpdateStatStageParent } from '../Modifiers'
import { Identity } from '../Mutations'
import { GetUnits } from '../Queries'

export class MindTwist extends Action {
  damage: Damage
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

    this.damage = {
      power: 90,
      attackType: 'magic',
      damageType: 'psychic',
    }
  }

  threshold = (source: Unit): number | undefined => {
    return 95 + source.stats.accuracy
  }
  criticalThreshold = (source: Unit): number | undefined => undefined
  criticalFactor = (source: Unit): number | undefined => undefined
  getAi(targets: Unit[], ctx: CombatContext): ActionAi {
    return getDamageAi(this, targets, ctx)
  }

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext,
    options: ActionResolveOptions
  ): ActionResult[] => {
    ctx = modifyRenderContext(options, ctx)
    const data = getActionData(source, this, ctx)
    const applyModifierRoll = random.int(0, 100)
    const applyMagicDown = applyModifierRoll <= this.magicDownChance

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
              const damage = calculateDamage(
                this.damage,
                data.source,
                target,
                data.accuracyRoll
              )
              return getMutationsFromDamageResult(source, target, damage)
            }),
            addedModifiers: ifArray(
              applyMagicDown,
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
        })
      ),
    ]
  }
}
