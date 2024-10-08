import {
  Action,
  ActionAi,
  ActionResult,
  CombatContext,
  Id,
  Unit,
} from '../../types'
import {
  applyModifiers,
  buildActionResult,
  calculateDamages,
  getActionData,
  getMutationsFromDamageResult,
} from '../../utils'
import { getDamageAiRating } from '../../utils/getDamageAiRating'
import { MagicStageDownParentId, MindShatterId } from '../Ids'
import { UpdateStatStageParent } from '../Modifiers'
import { Identity } from '../Mutations'
import { EmptyArray } from '../Queries'

export class MindShatter extends Action {
  magicDownStages = -2

  constructor(sourceId: Id, teamId: Id) {
    super(MindShatterId, {
      sourceId,
      teamId,
      cost: new Identity({}),
      targets: new EmptyArray(),
      maxTargetCount: 0,
    })

    this.damages = [
      {
        power: 130,
        attackType: 'magic',
        damageType: 'psychic',
      },
    ]
  }

  threshold = (source: Unit): number | undefined => 90 + source.stats.accuracy
  criticalThreshold = (source: Unit): number | undefined => 5
  criticalFactor = (source: Unit): number | undefined => 1.5

  getAi(targets: Unit[], ctx: CombatContext): ActionAi {
    return getDamageAiRating(this, targets, ctx)
  }

  mapTargets = (targets: Unit[], ctx: CombatContext): Unit[] => {
    const source = ctx.units.find((u) => u.id === this.sourceId)
    return ctx.units
      .map((u) => applyModifiers(u, ctx).unit)
      .filter((u) => u.flags.isActive && u.teamId !== source?.teamId)
  }

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext
  ): ActionResult[] => {
    const data = getActionData(source, this, ctx)

    return [
      buildActionResult(this, data, source, targets, ctx, (modifiedTargets) => {
        return {
          onSuccess: {
            mutations: modifiedTargets
              .flatMap((target) => {
                const damage = calculateDamages(
                  this.damages,
                  data.source,
                  target,
                  data.accuracyRoll
                )
                return getMutationsFromDamageResult(source, target, damage)
              })
              .concat(
                new UpdateStatStageParent({
                  registryId: MagicStageDownParentId,
                  sourceId: source.id,
                  parentId: source.id,
                  stat: 'magic',
                  stages: this.magicDownStages,
                })
              ),
          },
        }
      }),
    ]
  }
}
