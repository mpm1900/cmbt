import { LogCritical } from '@/components/ui/log'
import { getDamageFromMutations } from '@/utils'
import { handleTriggerEvent } from '@/utils/handleTriggerEvent'
import { logResult } from '@/utils/logResult'
import { SetDeadAsInactive } from '@repo/game/data'
import {
  ActionResult,
  CombatContext,
  MutationFilterArgs,
  TriggerEvent,
} from '@repo/game/types'
import { isUnitAliveCtx } from '@repo/game/utils'
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

export type CleanupResult = (context: CombatContext) => CombatContext

export function useCombatActions() {
  const combat = useCombat()
  const actionsQueue = useActions()
  const results = useResults()
  const actions = useActions()

  const cleanupResult: CleanupResult = (context) => {
    const deadActiveUnits = context.units.filter(
      (u) => u.flags.isActive && !isUnitAliveCtx(u, context)
    )
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

    context.modifiers = combat.removeWhere((modifier) => {
      const parent = context.units.find((u) => u.id === modifier.parentId)
      return !!parent && !parent?.flags.isActive
    })
    // context.modifiers = combat.removeZeroDurations()
    return context
  }

  const commitResult: CommitResult = (result, context, args) => {
    const {
      action,
      addedModifiers: modifiers,
      mutations,
      addedUnits,
      removedUnits,
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
        if (damage > 0) {
          const target = context.units.find((u) => u.id === unitId)
          if (target) {
            pushTriggers('on Unit Take Damage', context, {
              units: [target],
            })
          }
          if (result.source) {
            pushTriggers('on Unit Deal Damage', context, {
              units: [result.source],
            })
          }
        }
      })
    }
    if (modifiers?.length) {
      context.modifiers = combat.add(modifiers)
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
    return context
  }

  function pushTriggers(
    event: TriggerEvent,
    context: CombatContext,
    args?: MutationFilterArgs
  ) {
    const result = handleTriggerEvent(event, combat.log, context, args)
    results.enqueue(result)
  }

  return {
    commitResult,
    cleanupResult,
    pushTriggers,
  }
}
