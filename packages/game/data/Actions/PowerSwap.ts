import {
  Action,
  ActionResolveOptions,
  ActionResult,
  CombatContext,
  Id,
  Unit,
} from '../../types'
import {
  buildActionResult,
  getActionData,
  getModifiersFromUnit,
  modifyRenderContext,
} from '../../utils'
import { PowerSwapId } from '../Ids'
import { UpdateStatStageParent } from '../Modifiers'
import { AddModifiersToParent, Identity, SetIsActiveParent } from '../Mutations'
import { GetUnits } from '../Queries'

export class PowerSwap extends Action {
  constructor(sourceId: Id, teamId: Id) {
    super(PowerSwapId, {
      sourceId,
      teamId,
      priority: -1,
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
    ctx: CombatContext,
    options: ActionResolveOptions
  ): ActionResult[] => {
    ctx = modifyRenderContext(options, ctx)
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
              new AddModifiersToParent({
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
            /*
          updateModifiers: (modifiers) => {
            return modifiers.map((modifier) => {
              const target = modifiedTargets[0]
              if (modifier.parentId === this.sourceId) {
                modifier.parentId = target.id
              }
              return modifier
            })
          } */
          },
        })
      ),
    ]
  }
}
