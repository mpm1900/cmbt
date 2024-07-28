import {
  ActionRenderResult,
  ActionsQueueItem,
  GameContext,
  Modifier,
  TriggerEvent,
  Unit,
} from '@repo/game/types'

import {
  applyModifier,
  getTriggersByEvent,
  isUnitAliveCtx,
  ZERO_UNIT,
} from '@repo/game/utils'
import { SetDeadAsInactive, SetLastUsedActionId } from '@repo/game/data'
import { useActions, useCleanup, useModifiers, useUnits } from './state'
import { Separator } from '@/components/ui/separator'

export type CommitResultOptions = {
  enableLog?: boolean
}

export type CommitResults = (
  result: ActionRenderResult,
  context: GameContext,
  options?: CommitResultOptions
) => GameContext

function logMutations(mutations: Modifier[], context: GameContext) {
  mutations
    .filter((m) => m.id !== SetLastUsedActionId)
    .forEach((mutation) => {
      const diffs = applyModifier(ZERO_UNIT, mutation)
      const parent = context.units.find((u) => u.id === mutation.parentId)
      if (!parent || mutation.filter(parent, context)) {
        logMutationDiffs(parent, diffs, context)
      }
    })
}

function logMutationDiffs(
  parent: Unit | undefined,
  diffs: Unit,
  context: GameContext
) {
  const name = parent?.name ?? 'Multiple Units'
  if (diffs.values.damage > 0)
    context.log(`${name} take${!!parent && 's'} ${diffs.values.damage} damage.`)
}

export function useGameActions() {
  const unitStore = useUnits()
  const modifierStore = useModifiers()
  const actionsStore = useActions()
  const cleanupStore = useCleanup()

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
      console.log(modifiers)
      context.modifiers = modifierStore.add(modifiers)
    }
    if (updateModifiers) {
      context.modifiers = modifierStore.setModifiers(updateModifiers)
    }
    if (updateActionQueue) {
      actionsStore.setQueue(updateActionQueue)
    }
    if (addedUnits?.length) {
      context = runTriggers('onUnitEnter', context)
    }

    // round cleanup
    const deadActiveUnits = context.units.filter(
      (u) => u.flags.isActive && !isUnitAliveCtx(u.id, context)
    )
    deadActiveUnits.forEach((u) => {
      context.log(`${u.name} died.`)
    })
    context.units = unitStore.update([new SetDeadAsInactive()], context)
    context.modifiers = modifierStore.removeWhere((modifier) => {
      const parent = context.units.find((u) => u.id === modifier.parentId)
      return !parent?.flags.isActive
    })
    context.modifiers = modifierStore.removeZeroDurations()
    return context
  }

  function runTriggers(event: TriggerEvent, context: GameContext): GameContext {
    const triggers = getTriggersByEvent(context.modifiers, event)
    if (triggers.length > 0) {
      context.log(
        <div className="flex flex-row items-center space-x-2 text-muted-foreground/40 font-bold">
          {event}
          <Separator />
        </div>
      )
    }

    const result: ActionRenderResult = {
      modifiers: triggers
        .filter((trigger) => trigger.modifiers !== undefined)
        .flatMap(
          (trigger) =>
            (trigger.modifiers && trigger.modifiers(context)) as Modifier[]
        ),
      mutations: triggers.filter((trigger) => !trigger.modifiers),
    }
    logMutations(result.mutations ?? [], context)
    return commitResult(result, context)
  }

  return {
    commitResult,
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
