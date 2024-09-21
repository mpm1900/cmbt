import { LogCritical } from '@/components/ui/log'
import { getDamageFromMutations } from '@/utils'
import { handleTriggerEvent } from '@/utils/handleTriggerEvent'
import { logResult } from '@/utils/logResult'
import { GetUnits, SetDeadAsInactive } from '@repo/game/data'
import {
  ActionResult,
  CombatContext,
  MutationFilterArgs,
  Trigger,
  TriggerEvent,
} from '@repo/game/types'
import { useActions, useCombat } from './state'
import { useResults } from './state/useResults'

export type CommitResultOptions = {
  enableLog?: boolean
}

export type CommitResult = (
  result: ActionResult,
  context: CombatContext,
  args?: MutationFilterArgs
) => CombatContext

export function useCombatActions() {
  const combat = useCombat()
  const actionsQueue = useActions()
  const results = useResults()
  const actions = useActions()

  const cleanupResult = (result: ActionResult, context: CombatContext) => {
    const first = results.queue[0]
    if (first.id !== result.id) return

    const deadActiveUnits = new GetUnits({
      isActive: true,
      isAlive: false,
    }).resolve(context)

    deadActiveUnits.forEach((u) => {
      combat.log(<LogCritical>{u.name} fell.</LogCritical>)
    })

    context.units = combat.mutate([new SetDeadAsInactive()], context)
    actions.setQueue((items) =>
      items.map((item) => {
        return {
          ...item,
          targetIds: item.targetIds.map((tid) =>
            deadActiveUnits.some((u) => u.id === tid) ? '' : tid
          ),
        }
      })
    )

    if (deadActiveUnits.length > 0) {
      pushTriggers('on Unit Die', context, {
        units: deadActiveUnits,
      })
    }

    context.modifiers = combat.removeModifiersWhere((modifier) => {
      const parent = context.units.find((u) => u.id === modifier.parentId)
      return !!parent && !parent?.flags.isActive
    })
  }

  const commitResult: CommitResult = (result, context, args) => {
    const {
      addedModifiers,
      mutations,
      addedUnits,
      removedUnits,
      stagedActions,
      updateModifiers,
      updateActionQueue,
    } = result
    logResult(result, combat.log, context)

    if (removedUnits?.length) {
      pushTriggers('on Unit Switch Out', context, {
        units: removedUnits,
      })
    }
    if (mutations?.length) {
      const targets = result.expandedTargets ?? result.targets ?? []
      const damages = getDamageFromMutations(targets, mutations, context, args)
      context.units = combat.mutate(mutations, context, args)
      Object.entries(damages).forEach(([unitId, damage]) => {
        const target = context.units.find((u) => u.id === unitId)
        if (target) {
          pushTriggers('on Unit Take Damage', context, {
            units: [target],
            damage,
            result,
          })
        }
        if (result.source) {
          pushTriggers('on Unit Deal Damage', context, {
            units: [result.source],
            damage,
            result,
          })
        }
      })
    }
    if (addedModifiers?.length) {
      context.modifiers = combat.addModifiers(addedModifiers)
    }
    if (updateModifiers) {
      context.modifiers = combat.updateModifiers(updateModifiers)
    }
    if (updateActionQueue) {
      actionsQueue.setQueue(updateActionQueue)
    }
    if (addedUnits?.length) {
      pushTriggers('on Unit Enter', context, {
        units: addedUnits,
      })
    }

    if (result.data?.source && stagedActions && stagedActions[0]) {
      combat.stageAction(result.data.source.id, stagedActions[0])
    }

    return context
  }

  function pushTriggers(
    event: TriggerEvent,
    context: CombatContext,
    args?: MutationFilterArgs
  ) {
    const { result, triggers } = handleTriggerEvent(
      event,
      combat.log,
      context,
      args
    )
    combat.updateModifiers((mods) =>
      mods
        .map((mod) =>
          triggers.some((t) => t.rtid === mod.rtid)
            ? (mod as Trigger).decrementUses()
            : mod
        )
        .filter(
          (m) => (m as Trigger).uses === undefined || (m as Trigger).uses !== 0
        )
    )
    results.enqueue(result)
  }

  return {
    commitResult,
    cleanupResult,
    pushTriggers,
  }
}
