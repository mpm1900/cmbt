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
  getActionData,
  getDamageAiRating,
} from '../../utils'
import { SongOfRuinId } from '../Ids'
import { DamageParent, Identity } from '../Mutations'
import { GetUnits } from '../Queries'

export class SongOfRuin extends Action {
  constructor(sourceId: Id, teamId: Id) {
    super(SongOfRuinId, {
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
        power: 0,
        attackType: 'magic',
        damageType: 'blight',
      },
    ]
  }

  threshold = (source: Unit): number | undefined => {
    return 90 + source.stats.accuracy
  }

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
            mutations: modifiedTargets.map((target) => {
              const evasionRoll = random.int(0, 100)
              const evasionSuccess = target.stats.evasion > evasionRoll
              const remainingHealth = target.stats.health - target.values.damage
              return new DamageParent({
                sourceId: source.id,
                parentId: target.id,
                static: remainingHealth * 0.5,
                evasionSuccess: evasionSuccess,
              })
            }),
          },
        })
      ),
    ]
  }
}
