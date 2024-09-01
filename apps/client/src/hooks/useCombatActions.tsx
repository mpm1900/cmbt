import { LogCritical, LogHeader } from '@/components/ui/log'
import {
  getDamageFromMutations,
  logActionResults,
  logMiss,
  logModifiers,
  logMutations,
} from '@/utils'
import { handleCleanup } from '@/utils/handleCleanup'
import { handleTriggerEvent } from '@/utils/handleTriggerEvent'
import { logCritical } from '@/utils/logCritical'
import { SetDeadAsInactive } from '@repo/game/data'
import {
  ActionResult,
  ActionsQueueItem,
  CombatContext,
  MutationFilterArgs,
  TriggerEvent,
} from '@repo/game/types'
import { isUnitAliveCtx } from '@repo/game/utils'
import {
  useActions,
  useCleanup,
  useCombat,
  useCombatSettings,
  useCombatUi,
} from './state'

export type CommitResultOptions = {
  enableLog?: boolean
}

export type CommitResult = (
  result: ActionResult,
  context: CombatContext,
  options?: CommitResultOptions,
  args?: MutationFilterArgs
) => CombatContext

export type CleanupResult = (context: CombatContext) => CombatContext

export function useCombatActions() {
  const combat = useCombat()
  const activeUnit = useCombatUi()
  const actionsStore = useActions()
  const cleanupStore = useCleanup()
  const settings = useCombatSettings()

  const cleanupResult: CleanupResult = (context) => {
    // round cleanup
    const deadActiveUnits = context.units.filter(
      (u) => u.flags.isActive && !isUnitAliveCtx(u.id, context)
    )
    deadActiveUnits.forEach((u) => {
      combat.log(<LogCritical>{u.name} died.</LogCritical>)
    })

    context.units = combat.mutate([new SetDeadAsInactive()], context)

    if (deadActiveUnits.length > 0) {
      context = runTriggers('on Unit Die', context, {
        units: deadActiveUnits,
      })
    }

    context.modifiers = combat.removeWhere((modifier) => {
      const parent = context.units.find((u) => u.id === modifier.parentId)
      return !!parent && !parent?.flags.isActive
    })
    context.modifiers = combat.removeZeroDurations()
    return context
  }

  const commitResult: CommitResult = (result, context, options, args) => {
    const {
      addedModifiers: modifiers,
      mutations,
      addedUnits,
      removedUnits,
      updateModifiers,
      updateActionQueue,
    } = result

    if (options?.enableLog) {
      logMiss(result, combat.log, context)
    }

    if (removedUnits?.length) {
      context = runTriggers('on Unit Switch Out', context, {
        units: removedUnits,
      })
    }
    if (mutations?.length) {
      if (options?.enableLog) logMutations(mutations, combat.log, context)
      const targets = result.expandedTargets ?? result.targets ?? []
      const damages = getDamageFromMutations(targets, mutations, context, args)
      Object.entries(damages).forEach(([unitId, damage]) => {
        if (damage > 0) {
          const target = context.units.find((u) => u.id === unitId)
          if (target) {
            context = runTriggers('on Unit Take Damage', context, {
              units: [target],
            })
          }
          if (result.source) {
            context = runTriggers('on Unit Deal Damage', context, {
              units: [result.source],
            })
          }
        }
      })
      context.units = combat.mutate(mutations, context, args)
    }
    if (modifiers?.length) {
      if (options?.enableLog) logModifiers(modifiers, combat.log, context)
      context.modifiers = combat.add(modifiers)
    }
    if (options?.enableLog) {
      logCritical(result, combat.log, context)
    }
    if (updateModifiers) {
      context.modifiers = combat.updateModifiers(updateModifiers)
    }
    if (updateActionQueue) {
      actionsStore.setQueue(updateActionQueue)
    }
    if (addedUnits?.length) {
      context = runTriggers('on Unit Enter', context, {
        units: addedUnits,
      })
    }

    if (options?.enableLog) {
      logActionResults(result, combat.log, context)
    }
    return context
  }

  function runTriggers(
    event: TriggerEvent,
    context: CombatContext,
    args?: MutationFilterArgs
  ): CombatContext {
    const result = handleTriggerEvent(event, combat.log, context, args)
    context = commitResult(result, context, { enableLog: false })
    return cleanupResult(context)
  }

  function decrementModifierDurations() {
    combat.decrementDurations()
    return combat.removeZeroDurations()
  }

  function nextTurn(runEndOfTurnTriggers: boolean, context: CombatContext) {
    if (runEndOfTurnTriggers && !context.turn.hasRanOnTurnEndTriggers) {
      context = runTriggers('on Turn End', context)
      context.modifiers = decrementModifierDurations()
      context.turn = combat.setTurn((t) => ({ hasRanOnTurnEndTriggers: true }))
      cleanup(false, context)
    } else {
      combat.setStatus('upkeep')
      combat.next()
      combat.log(<LogHeader>turn {combat.turn.count + 1}</LogHeader>)
      activeUnit.setActiveUnit(
        context.units.find((u) => u.flags.isActive && u.teamId === context.user)
      )
      setTimeout(
        () => {
          combat.setStatus('main')
        },
        context.turn.count === 0 ? 0 : settings.gameSpeed
      )
    }
  }

  const cleanup = (runEndOfTurnTriggers: boolean, context: CombatContext) => {
    handleCleanup(
      context,
      () => nextTurn(runEndOfTurnTriggers, context),
      () => combat.setStatus('cleanup'),
      () => combat.setStatus('done')
    )
  }

  return {
    commitResult,
    cleanupResult,
    cleanup,
    decrementModifierDurations,
    nextTurn,
    runTriggers,
    removeZeroDurations: combat.removeZeroDurations,
    pushAction: (...items: ActionsQueueItem[]) => {
      actionsStore.enqueue(...items)
    },
    pushCleanupAction: (...items: ActionsQueueItem[]) => {
      cleanupStore.enqueue(...items)
    },
  }
}
