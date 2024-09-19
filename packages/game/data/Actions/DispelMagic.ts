import { Action, ActionResult, CombatContext, Id, Unit } from '../../types'
import { buildActionResult, getActionData } from '../../utils'
import { AddStatModifiersImmunityAllId, DispelMagicId } from '../Ids'
import {
  AddModifiersToRegistryAll,
  UpdateStatAll,
  UpdateStatParent,
  UpdateStatStageParent,
  UpdateStatTeam,
} from '../Modifiers'
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
    ctx: CombatContext
  ): ActionResult[] => {
    const data = getActionData(source, this, ctx)

    return [
      buildActionResult(this, data, source, targets, ctx, () => ({
        onSuccess: {
          addedModifiers: [
            new AddModifiersToRegistryAll({
              registryId: AddStatModifiersImmunityAllId,
              sourceId: source.id,
              duration: this.duration,
              modifiers: [
                // UpdateStatStageAllId,
                new UpdateStatAll({}),
                new UpdateStatParent({}),
                new UpdateStatStageParent({}),
                // UpdateStatStageTeamId,
                new UpdateStatTeam({ teamId: '' }),
              ],
            }),
          ],
        },
      })),
    ]
  }
}
