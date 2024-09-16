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
  calculateDamage,
  getActionData,
  getMutationsFromDamageResult,
  getUnitBase,
} from '../../utils'
import { getDamageAiRating } from '../../utils/getDamageAiRating'
import { HyperBeamId, StunnedParentId } from '../Ids'
import { UpdateFlagParent } from '../Modifiers'
import { UpdateValueParent } from '../Mutations'
import { GetUnits } from '../Queries'

export class HyperBeam extends Action {
  stunDuration: number = 2

  constructor(sourceId: Id, teamId: Id) {
    super(HyperBeamId, {
      sourceId,
      teamId,
      cost: new UpdateValueParent({
        sourceId: sourceId,
        parentId: sourceId,
        valueKey: 'focus',
        static: -30,
      }),
      targets: new GetUnits({
        notTeamId: teamId,
        isActive: true,
        isHidden: false,
      }),
      maxTargetCount: 1,
    })

    this.damages = [
      {
        power: 0,
        attackType: 'magic',
        damageType: 'force',
      },
    ]
  }

  threshold = (source: Unit): number | undefined => 95 + source.stats.accuracy
  criticalThreshold = (source: Unit): number | undefined => 5
  criticalFactor = (source: Unit): number | undefined => 1.25
  getAi(targets: Unit[], ctx: CombatContext): ActionAi {
    return getDamageAiRating(this, targets, ctx)
  }

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext
  ): ActionResult[] => {
    const data = getActionData(source, this, ctx)

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
              const { base } = getUnitBase(source.baseId)
              const damage = calculateDamage(
                {
                  ...this.damages[0]!,
                  power: (base?.stats.magic ?? 0) * 2,
                },
                data.source,
                target,
                data.accuracyRoll
              )
              return getMutationsFromDamageResult(source, target, damage)
            }),
            addedModifiers: [
              new UpdateFlagParent({
                registryId: StunnedParentId,
                sourceId: source.id,
                parentId: source.id,
                flagKey: 'isStunned',
                value: true,
                duration: 2,
              }),
            ],
          },
        })
      ),
    ]
  }
}
