import {
  ActionResult,
  ActionsQueueItem,
  GameContext,
  Modifier,
  Trigger,
  TriggerEvent,
  Unit,
} from '@repo/game/types'
import { getTriggersByEvent, isUnitAliveCtx } from '@repo/game/utils'
import {
  useActions,
  useCleanup,
  useModifiers,
  useTurn,
  useUnits,
} from './state'
import { logModifiers, logMutations } from '@/utils'
import { logTriggers } from '@/utils/logTriggers'
import { LogCritical, LogHeader } from '@/components/ui/log'
import { handleCleanup } from '@/utils/handleCleanup'
import { logFailure } from '@/utils/logFailure'
import { SetDeadAsInactive } from '@repo/game/data'

export type CommitResultOptions = {
  enableLog?: boolean
}

export type CommitResults = (
  result: ActionResult,
  context: GameContext,
  options?: CommitResultOptions
) => GameContext

export function useGameActions() {
  const turnStore = useTurn()
  const unitStore = useUnits()
  const modifierStore = useModifiers()
  const actionsStore = useActions()
  const cleanupStore = useCleanup()

  const cleanupResult = (context: GameContext): GameContext => {
    // round cleanup
    const deadActiveUnits = context.units.filter(
      (u) => u.flags.isActive && !isUnitAliveCtx(u.id, context)
    )
    deadActiveUnits.forEach((u) => {
      context.log(<LogCritical>{u.name} died.</LogCritical>)
    })
    context.units = unitStore.mutate([new SetDeadAsInactive()], context)

    context.modifiers = modifierStore.removeWhere((modifier) => {
      const parent = context.units.find((u) => u.id === modifier.parentId)
      return !!parent && !parent?.flags.isActive
    })
    context.modifiers = modifierStore.removeZeroDurations()
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
    logFailure(result, context)
    if (mutations?.length) {
      if (options?.enableLog) logMutations(mutations, context)
      context.units = unitStore.mutate(mutations, context)
    }
    if (modifiers?.length) {
      if (options?.enableLog) logModifiers(modifiers, context)
      context.modifiers = modifierStore.add(modifiers)
    }
    if (updateModifiers) {
      context.modifiers = modifierStore.updateModifiers(updateModifiers)
    }
    if (updateActionQueue) {
      actionsStore.setQueue(updateActionQueue)
    }
    if (addedUnits?.length) {
      context = runTriggers('on Unit Enter', context)
    }

    return context
  }

  function runTriggers(event: TriggerEvent, context: GameContext): GameContext {
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
    logModifiers(result.addedModifiers ?? [], context)
    logMutations(result.mutations ?? [], context)

    return commitResult(result, context)
  }

  function decrementModifierDurations() {
    modifierStore.decrementDurations()
    return modifierStore.removeZeroDurations()
  }

  function nextTurn(runEndOfTurnTriggers: boolean, context: GameContext) {
    if (runEndOfTurnTriggers) {
      context = runTriggers('on Turn End', context)
      context.modifiers = decrementModifierDurations()
      cleanup(false, context)
    } else {
      turnStore.next()
      context.log(<LogHeader>turn {turnStore.turn.count + 2}</LogHeader>)
      turnStore.setStatus('waiting-for-input')
    }
  }

  const cleanup = (runEndOfTurnTriggers: boolean, context: GameContext) => {
    handleCleanup(
      context,
      () => nextTurn(runEndOfTurnTriggers, context),
      () => turnStore.setStatus('cleanup'),
      () => turnStore.setStatus('done')
    )
  }

  return {
    commitResult,
    cleanupResult,
    cleanup,
    decrementModifierDurations,
    nextTurn,
    runTriggers,
    removeZeroDurations: modifierStore.removeZeroDurations,
    pushAction: (...items: ActionsQueueItem[]) => {
      actionsStore.enqueue(...items)
    },
    pushCleanupAction: (...items: ActionsQueueItem[]) => {
      cleanupStore.enqueue(...items)
    },
  }
}
