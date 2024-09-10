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
  modifyRenderContext,
} from '../../utils'
import { DefenseStageDownParentId, PiercingStrikeId } from '../Ids'
import { UpdateStatStageParent } from '../Modifiers'
import { Identity } from '../Mutations'
import { GetUnits } from '../Queries'

export class PiercingStrike extends Action {
  damage: Damage
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

    this.damage = {
      power: 80,
      attackType: 'physical',
      damageType: 'force',
    }
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
    return getDamageAi(this, targets, ctx)
  }

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext,
    options: ActionResolveOptions
  ): ActionResult => {
    ctx = modifyRenderContext(options, ctx)
    const data = getActionData(source, this, ctx)
    const applyModifierRoll = random.int(0, 100)
    const applyDefenseDown = applyModifierRoll <= this.defenseDownChance

    return buildActionResult(
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
            applyDefenseDown,
            modifiedTargets.map(
              (target) =>
                new UpdateStatStageParent({
                  registryId: DefenseStageDownParentId,
                  stat: 'defense',
                  sourceId: source.id,
                  parentId: target.id,
                  offset: this.defenseStage,
                })
            )
          ),
        },
      })
    )
  }
}
