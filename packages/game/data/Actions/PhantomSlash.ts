import { nanoid } from 'nanoid'
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
} from '../../utils'
import {
  IntangibleParentId,
  PhantomSlashId,
  PhantomSlashStagedId,
} from '../Ids'
import { AddModifiersToRegistryParent, IntangibleParent } from '../Modifiers'
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

    this.damages = [
      {
        power: 60,
        attackType: 'physical',
        damageType: 'force',
      },
      {
        power: 60,
        attackType: 'physical',
        damageType: 'blight',
      },
    ]
  }

  getAi(targets: Unit[], ctx: CombatContext): ActionAi {
    return getDamageAiRating(this, targets, ctx)
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
            addedModifiers: [
              new IntangibleParent({
                sourceId: this.sourceId,
                parentId: this.sourceId,
                duration: 2,
              }),
            ],
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
        power: 60,
        attackType: 'physical',
        damageType: 'force',
      },
      {
        power: 60,
        attackType: 'physical',
        damageType: 'blight',
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
            addedModifiers: [
              new AddModifiersToRegistryParent({
                sourceId: source.id,
                parentId: source.id,
                duration: 1,
                modifierIds: [IntangibleParentId],
              }),
            ],
          },
        })
      ),
    ]
  }
}
