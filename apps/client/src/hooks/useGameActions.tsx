import {
  ActionResult,
  ActionsQueueItem,
  GameContext,
  Modifier,
  TriggerEvent,
  Unit,
} from '@repo/game/types'
import { getTriggersByEvent, isUnitAliveCtx } from '@repo/game/utils'
import { SetDeadAsInactive } from '@repo/game/data'
import { useActions, useCleanup, useModifiers, useUnits } from './state'
import { logModifiers, logMutations } from '@/utils'
import { logTriggers } from '@/utils/logTriggers'
import { LogCritical } from '@/components/ui/log'

export type CommitResultOptions = {
  enableLog?: boolean
}

export type CommitResults = (
  result: ActionResult,
  context: GameContext,
  options?: CommitResultOptions
) => GameContext

export function useGameActions() {
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
    context.units = unitStore.update([new SetDeadAsInactive()], context)
    context.modifiers = modifierStore.removeWhere((modifier) => {
      const parent = context.units.find((u) => u.id === modifier.parentId)
      return !parent?.flags.isActive
    })
    context.modifiers = modifierStore.removeZeroDurations()
    return context
  }

  const commitResult: CommitResults = (result, context, options) => {
    const {
      modifiers,
      mutations,
      addedUnits,
      updateModifiers,
      updateActionQueue,
    } = result
    if (mutations?.length) {
      if (options?.enableLog) logMutations(mutations, context)
      context.units = unitStore.update(mutations, context)
    }
    if (modifiers?.length) {
      if (options?.enableLog) logModifiers(modifiers, context)
      context.modifiers = modifierStore.add(modifiers)
    }
    if (updateModifiers) {
      context.modifiers = modifierStore.setModifiers(updateModifiers)
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
      modifiers: triggers
        .filter((trigger) => trigger.modifiers !== undefined)
        .flatMap(
          (trigger) => (trigger.modifiers && trigger.modifiers(context)) ?? []
        ),
      mutations: triggers.filter((trigger) => !trigger.modifiers),
    }

    logTriggers(triggers, event, context)
    logModifiers(result.modifiers ?? [], context)
    logMutations(result.mutations ?? [], context)

    return commitResult(result, context)
  }

  return {
    commitResult,
    cleanupResult,
    runTriggers,
    removeZeroDurations: modifierStore.removeZeroDurations,
    decrementModifierDurations: () => {
      modifierStore.decrementDurations()
      return modifierStore.removeZeroDurations()
    },
    pushAction: (...items: ActionsQueueItem[]) => {
      actionsStore.enqueue(...items)
    },
    pushCleanupAction: (...items: ActionsQueueItem[]) => {
      cleanupStore.enqueue(...items)
    },
    removeUnit: (unit: Unit) => {
      unitStore.remove(unit.id)
      modifierStore.removeWhere((m) => m.parentId === unit.id)
    },
  }
}
