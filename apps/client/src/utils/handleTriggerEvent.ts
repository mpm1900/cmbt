import { CombatLogger } from '@/hooks/state'
import {
  ActionResult,
  CombatContext,
  MutationFilterArgs,
  Trigger,
  TriggerEvent,
} from '@repo/game/types'
import { getTriggersByEvent, validateModifiers } from '@repo/game/utils'
import { logTriggers } from './logTriggers'

export function handleTriggerEvent(
  event: TriggerEvent,
  log: CombatLogger,
  ctx: CombatContext,
  args?: MutationFilterArgs
): ActionResult {
  args = args ?? {}
  const triggers = validateModifiers(
    getTriggersByEvent(ctx.modifiers, event, ctx, args),
    []
  ) as Trigger[]
  const result: ActionResult = {
    shouldLog: true,
    addedModifiers: triggers
      .filter((trigger) => !!trigger.modifiers)
      .flatMap(
        (trigger) => (trigger.modifiers && trigger.modifiers(ctx)) ?? []
      ),
    mutations: triggers
      .filter((trigger) => !trigger.modifiers)
      .flatMap((trigger) =>
        trigger.mutations ? trigger.mutations(ctx) : [trigger]
      ),
  }
  if (result.addedModifiers?.length || result.mutations?.length) {
    logTriggers(triggers, event, log, ctx, args)
  }

  return result
}
