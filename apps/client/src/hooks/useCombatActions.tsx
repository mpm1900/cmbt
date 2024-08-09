import {
  ActionResult,
  ActionsQueueItem,
  CombatContext,
  TriggerEvent,
} from '@repo/game/types'
import { getTriggersByEvent, isUnitAliveCtx } from '@repo/game/utils'
import { useActions, useCombatUi, useCleanup, useCombat } from './state'
import { logActionResults, logModifiers, logMutations } from '@/utils'
import { logTriggers } from '@/utils/logTriggers'
import { LogCritical, LogHeader } from '@/components/ui/log'
import { handleCleanup } from '@/utils/handleCleanup'
import { logMiss } from '@/utils'
import { SetDeadAsInactive } from '@repo/game/data'

export type CommitResultOptions = {
  enableLog?: boolean
}

export type CommitResults = (
  result: ActionResult,
  context: CombatContext,
  options?: CommitResultOptions
) => CombatContext

export function useCombatActions() {
  const combat = useCombat()
  const activeUnit = useCombatUi()
  const actionsStore = useActions()
  const cleanupStore = useCleanup()

  const cleanupResult = (context: CombatContext): CombatContext => {
    // round cleanup
    const deadActiveUnits = context.units.filter(
      (u) => u.flags.isActive && !isUnitAliveCtx(u.id, context)
    )
    deadActiveUnits.forEach((u) => {
      context.log(<LogCritical>{u.name} died.</LogCritical>)
    })
    context.units = combat.mutate([new SetDeadAsInactive()], context)

    context.modifiers = combat.removeWhere((modifier) => {
      const parent = context.units.find((u) => u.id === modifier.parentId)
      return !!parent && !parent?.flags.isActive
    })
    context.modifiers = combat.removeZeroDurations()
    return context
  }

  const commitResult: CommitResults = (result, context, options) => {
    const {
      addedModifiers: modifiers,
      mutations,
      addedUnits,
      updateModifiers,
      updateActionQueue,
    } = result

    if (mutations?.length) {
      if (options?.enableLog) logMutations(mutations, context)
      context.units = combat.mutate(mutations, context)
    }
    if (modifiers?.length) {
      if (options?.enableLog) logModifiers(modifiers, context)
      context.modifiers = combat.add(modifiers)
    }
    if (updateModifiers) {
      context.modifiers = combat.updateModifiers(updateModifiers)
    }
    if (updateActionQueue) {
      actionsStore.setQueue(updateActionQueue)
    }
    if (addedUnits?.length) {
      context = runTriggers('on Unit Enter', context)
    }

    if (options?.enableLog) {
      logMiss(result, context)
      logActionResults(result, context)
    }
    return context
  }

  function runTriggers(
    event: TriggerEvent,
    context: CombatContext
  ): CombatContext {
    const triggers = getTriggersByEvent(context.modifiers, event)
    const result: ActionResult = {
      addedModifiers: triggers
        .filter((trigger) => trigger.modifiers !== undefined)
        .flatMap(
          (trigger) => (trigger.modifiers && trigger.modifiers(context)) ?? []
        ),
      mutations: triggers.filter((trigger) => !trigger.modifiers),
    }

    logTriggers(triggers, event, context)
    if (result.addedModifiers) logModifiers(result.addedModifiers, context)
    if (result.mutations) logMutations(result.mutations, context)

    context = commitResult(result, context)
    return cleanupResult(context)
  }

  function decrementModifierDurations() {
    combat.decrementDurations()
    return combat.removeZeroDurations()
  }

  function nextTurn(runEndOfTurnTriggers: boolean, context: CombatContext) {
    if (runEndOfTurnTriggers) {
      context = runTriggers('on Turn End', context)
      context.modifiers = decrementModifierDurations()
      cleanup(false, context)
    } else {
      combat.next()
      context.log(<LogHeader>turn {combat.turn.count + 1}</LogHeader>)
      activeUnit.setActiveUnit(
        context.units.find((u) => u.flags.isActive && u.teamId === context.user)
      )
      combat.setStatus('waiting-for-input')
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
