import {
  Action,
  ACTION_PRIORITIES,
  ActionResult,
  CombatContext,
  Id,
  Unit,
} from '../../types'
import {
  buildActionResult,
  getActionData,
  getModifiersFromUnit,
} from '../../utils'
import { PowerSinkId } from '../Ids'
import { UpdateStatStageParent } from '../Modifiers'
import { Identity, SetIsActiveParent } from '../Mutations'
import { SetModifiersParent } from '../Mutations/system/SetModifiersParent'
import { GetUnits } from '../Queries'

export class PowerSink extends Action {
  constructor(sourceId: Id, teamId: Id) {
    super(PowerSinkId, {
      sourceId,
      teamId,
      priority: ACTION_PRIORITIES.SLOW,
      cost: new Identity(),
      targets: new GetUnits({
        teamId: teamId,
        isActive: false,
        isAlive: true,
      }),
      maxTargetCount: 1,
    })
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
          forceFailure: source.metadata.lastUsedActionId === this.id,
          onSuccess: {
            mutations: [
              new SetIsActiveParent({
                sourceId: source.id,
                parentId: source.id,
                isActive: false,
              }),
              new SetModifiersParent({
                sourceId: source.id,
                parentId: source.id,
                modifiers: ctx.modifiers.filter(
                  (m) => m.parentId === source.id && m.persistOnSwitch
                ),
              }),
              ...targets.flatMap((target) => [
                new SetIsActiveParent({
                  sourceId: source.id,
                  parentId: target.id,
                  isActive: true,
                }),
              ]),
            ],
            addedModifiers: modifiedTargets.flatMap((target) => [
              ...getModifiersFromUnit(target),
              ...ctx.modifiers
                .filter(
                  (m) =>
                    m.parentId === source.id &&
                    m instanceof UpdateStatStageParent
                )
                .map((m) => m as UpdateStatStageParent)
                .map(
                  (m) =>
                    new UpdateStatStageParent({
                      ...m,
                      sourceId: source.id,
                      parentId: target.id,
                    })
                ),
            ]),
            addedUnits: modifiedTargets,
            removedUnits: [source],
            updateActionQueue: (queue) => {
              return queue.map((item) => {
                const target = modifiedTargets[0]
                if (item.targetIds.includes(this.sourceId)) {
                  item.targetIds = item.targetIds.map((id) =>
                    id === this.sourceId ? target.id : id
                  )
                }
                return item
              })
            },
          },
        })
      ),
    ]
  }
}
