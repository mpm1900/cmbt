import {
  Action,
  ActionAi,
  ActionResolveOptions,
  ActionResult,
  CombatContext,
  Id,
  Unit,
} from '../../types'
import { buildActionResult, getActionData } from '../../utils'
import { modifyRenderContext } from '../../utils/modifyRenderContext'
import {
  AddStatModifiersImmunityAllId,
  DispelMagicId,
  UpdateStatAllId,
  UpdateStatParentId,
  UpdateStatStageAllId,
  UpdateStatStageParentId,
  UpdateStatStageTeamId,
  UpdateStatTeamId,
} from '../Ids'
import { AddModifiersToRegistryAll } from '../Modifiers'
import { Identity } from '../Mutations'
import { EmptyArray } from '../Queries/EmptyArray'

export class DispelMagic extends Action {
  duration: number = 5

  constructor(sourceId: Id, teamId: Id) {
    super(DispelMagicId, {
      sourceId,
      teamId,
      cost: new Identity({}),
      targets: new EmptyArray(),
      maxTargetCount: 0,
    })
  }

  threshold = (source: Unit): number | undefined => undefined
  criticalThreshold = (source: Unit): number | undefined => undefined
  criticalFactor = (source: Unit): number | undefined => undefined
  getAi(targets: Unit[], ctx: CombatContext): ActionAi {
    return { action: this, weight: 0, targetIds: [] }
  }

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext,
    options: ActionResolveOptions
  ): ActionResult => {
    ctx = modifyRenderContext(options, ctx)
    const data = getActionData(source, this, ctx)

    return buildActionResult(this, data, source, targets, ctx, () => ({
      onSuccess: {
        addedModifiers: [
          new AddModifiersToRegistryAll({
            registryId: AddStatModifiersImmunityAllId,
            sourceId: source.id,
            duration: this.duration,
            modifierIds: [
              UpdateStatAllId,
              UpdateStatParentId,
              UpdateStatStageAllId,
              UpdateStatStageParentId,
              UpdateStatStageTeamId,
              UpdateStatTeamId,
            ],
          }),
        ],
      },
    }))
  }
}
