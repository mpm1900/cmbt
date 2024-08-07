import random from 'random'
import {
  Action,
  ActionResult,
  ActionAi,
  CombatContext,
  Id,
  Unit,
  ActionResolveOptions,
  Damage,
} from '../../types'
import {
  calculateDamage,
  getActionData,
  getDamageAi,
  modifyRenderContext,
  buildActionResult,
} from '../../utils'
import { ActionId } from '../Ids'
import { DamageParent, Identity } from '../Mutations'
import { GetUnits } from '../Queries'
import { DefenseDownParent } from '../Modifiers'

export const CrunchId = ActionId()

export class Crunch extends Action {
  damage: Damage

  constructor(sourceId: Id, teamId: Id) {
    const attackType = 'physical'

    super(CrunchId, {
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
    }
  }

  threshold = (source: Unit): number | undefined => {
    return 90 + source.stats.accuracy
  }
  critical = (source: Unit): number | undefined => undefined
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
    const applyDefenseDown = applyModifierRoll <= 20

    return buildActionResult(
      this,
      data,
      source,
      targets,
      ctx,
      (modifiedTargets) => ({
        onSuccess: {
          mutations: modifiedTargets.flatMap((target) => {
            const { damage } = calculateDamage(
              this.damage,
              data.source,
              target,
              data.accuracyRoll
            )

            return [
              new DamageParent({
                sourceId: source.id,
                parentId: target.id,
                damage,
              }),
            ]
          }),
          addedModifiers: applyDefenseDown
            ? modifiedTargets.map(
                (target) =>
                  new DefenseDownParent({
                    sourceId: source.id,
                    parentId: target.id,
                    coef: 1.5,
                  })
              )
            : [],
        },
      })
    )
  }
}
