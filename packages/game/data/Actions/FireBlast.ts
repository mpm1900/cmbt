import random from 'random'
import {
  Action,
  ActionResolveOptions,
  ActionResult,
  ActionAi,
  CombatContext,
  Id,
  Unit,
  Damage,
} from '../../types'
import {
  calculateDamage,
  getActionData,
  getDamageAi,
  buildActionResult,
  getMutationsFromDamageResult,
} from '../../utils'
import { modifyRenderContext } from '../../utils/modifyRenderContext'
import { ActionId } from '../Ids'
import { Identity } from '../Mutations'
import { GetUnits } from '../Queries'
import { BurnedPowerDownId, PowerDownParent } from '../Modifiers'
import { BurnDamageOnTurnEndId, DamageParentOnTurnEnd } from '../Triggers'

export const FireBlastId = ActionId()
export class FireBlast extends Action {
  damage: Damage

  constructor(sourceId: Id, teamId: Id) {
    const attackType = 'magic'
    super(FireBlastId, {
      sourceId,
      teamId,
      cost: new Identity({}),
      targets: new GetUnits({
        notTeamId: teamId,
        isActive: true,
      }),
      attackType,
      maxTargetCount: 1,
    })

    this.damage = {
      value: 120,
      attackType,
      damageType: 'fire',
    }
  }

  threshold = (source: Unit): number | undefined => {
    return 75 + source.stats.accuracy
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
  ): ActionResult => {
    ctx = modifyRenderContext(options, ctx)
    const data = getActionData(source, this, ctx)
    const applyModifierRoll = random.int(0, 100)
    const applyDefenseDown = applyModifierRoll <= 10

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
          addedModifiers: applyDefenseDown
            ? modifiedTargets.flatMap((target) => [
                new PowerDownParent({
                  sourceId: source.id,
                  parentId: target.id,
                  coef: 2,
                  duration: 5,
                  maxInstances: 1,
                  rid: BurnedPowerDownId,
                }),
                new DamageParentOnTurnEnd({
                  sourceId: source.id,
                  parentId: target.id,
                  damage: 10,
                  duration: 5,
                  maxInstances: 1,
                  rid: BurnDamageOnTurnEndId,
                }),
              ])
            : [],
        },
      })
    )
  }
}
