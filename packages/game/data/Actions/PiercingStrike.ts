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
import { DefenseDownParentId, PiercingStrikeId } from '../Ids'
import { UpdateStatParent } from '../Modifiers'
import { Identity } from '../Mutations'
import { GetUnits } from '../Queries'

export class PiercingStrike extends Action {
  damage: Damage
  defenseDownChance: number = 20
  defenseDownFactor: number = -0.25

  constructor(sourceId: Id, teamId: Id) {
    const attackType = 'physical'

    super(PiercingStrikeId, {
      sourceId,
      teamId,
      cost: new Identity({ sourceId }),
      targets: new GetUnits({
        notTeamId: teamId,
        isActive: true,
      }),
      attackType,
      maxTargetCount: 1,
    })

    this.damage = {
      value: 80,
      attackType,
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
                new UpdateStatParent({
                  registryId: DefenseDownParentId,
                  stat: 'defense',
                  sourceId: source.id,
                  parentId: target.id,
                  factor: this.defenseDownFactor,
                })
            )
          ),
        },
      })
    )
  }
}
