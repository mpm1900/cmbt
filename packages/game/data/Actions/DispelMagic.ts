import {
  Action,
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

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext,
    options: ActionResolveOptions
  ): ActionResult[] => {
    ctx = modifyRenderContext(options, ctx)
    const data = getActionData(source, this, ctx)

    return [
      buildActionResult(this, data, source, targets, ctx, () => ({
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
      })),
    ]
  }
}
