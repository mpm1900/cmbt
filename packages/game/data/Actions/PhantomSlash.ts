import { nanoid } from 'nanoid'
import { Action, ActionResult, CombatContext, Id, Unit } from '../../types'
import {
  buildActionResult,
  calculateDamages,
  getActionData,
  getMutationsFromDamageResult,
} from '../../utils'
import { PhantomSlashId, PhantomSlashStagedId } from '../Ids'
import { Identity } from '../Mutations'
import { GetUnits } from '../Queries'

export class PhantomSlash extends Action {
  constructor(sourceId: Id, teamId: Id) {
    super(PhantomSlashId, {
      sourceId,
      teamId,
      cost: new Identity(),
      targets: new GetUnits({
        notTeamId: teamId,
        isActive: true,
        isHidden: false,
      }),
      maxTargetCount: 1,
    })
  }

  resolve(source: Unit, targets: Unit[], ctx: CombatContext): ActionResult[] {
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
            stagedActions: modifiedTargets.flatMap((target) => {
              const index = ctx.units
                .filter((u) => u.teamId === target.teamId && u.flags.isActive)
                .map((u) => u.id)
                .indexOf(target.id)

              return index !== -1
                ? [
                    {
                      id: nanoid(),
                      targetIds: [],
                      action: new PhantomSlashStaged(
                        this.sourceId,
                        this.teamId
                      ),
                      indexTarget: {
                        teamId: target.teamId,
                        indexes: [index],
                      },
                    },
                  ]
                : []
            }),
          },
        })
      ),
    ]
  }
}

export class PhantomSlashStaged extends Action {
  constructor(sourceId: Id, teamId: Id) {
    super(PhantomSlashStagedId, {
      sourceId,
      teamId,
      cost: new Identity(),
      targets: new GetUnits({
        notTeamId: teamId,
        isActive: true,
        isHidden: false,
      }),
      maxTargetCount: 1,
    })

    this.damages = [
      {
        power: 75,
        attackType: 'physical',
        damageType: 'force',
      },
    ]
  }

  resolve(source: Unit, targets: Unit[], ctx: CombatContext): ActionResult[] {
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
              const damage = calculateDamages(
                this.damages,
                data.source,
                target,
                data.accuracyRoll
              )
              return getMutationsFromDamageResult(source, target, damage)
            }),
          },
        })
      ),
    ]
  }
}
