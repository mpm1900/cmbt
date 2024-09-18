import { CombatLogger } from '@/hooks/state'
import {
  ActionResult,
  CombatContext,
  MutationFilterArgs,
  Trigger,
  TriggerEvent,
} from '@repo/game/types'
import { getTriggersByEvent, validateModifiers } from '@repo/game/utils'
import { nanoid } from 'nanoid/non-secure'
import { logTriggers } from './logTriggers'

export type HandleTriggerEventResult = {
  result: ActionResult
  triggers: Trigger[]
}

export function handleTriggerEvent(
  event: TriggerEvent,
  log: CombatLogger,
  ctx: CombatContext,
  args?: MutationFilterArgs
): HandleTriggerEventResult {
  args = args ?? {}
  const triggers = validateModifiers(
    getTriggersByEvent(ctx.modifiers, event, ctx, args),
    []
  ) as Trigger[]
  const result: ActionResult = {
    id: nanoid(),
    shouldLog: true,
    addedModifiers: triggers
      .filter((trigger) => !!trigger.modifiers)
      .flatMap(
        (trigger) => (trigger.modifiers && trigger.modifiers(ctx, args)) ?? []
      ),
    mutations: triggers
      .filter((trigger) => !trigger.modifiers)
      .flatMap((trigger) =>
        trigger.mutations ? trigger.mutations(ctx, args) : [trigger]
      ),
  }

  if (result.addedModifiers?.length || result.mutations?.length) {
    logTriggers(triggers, event, log, ctx, args)
  }

  return { result, triggers }
}
