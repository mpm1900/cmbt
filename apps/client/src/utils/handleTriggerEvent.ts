import { CombatLogger } from '@/hooks/state'
import {
  ActionResult,
  CombatContext,
  MutationFilterArgs,
  Trigger,
  TriggerEvent,
} from '@repo/game/types'
import { getTriggersByEvent, validateModifiers } from '@repo/game/utils'
import { logModifiers } from './logModifiers'
import { logMutations } from './logMutations'
import { logTriggers } from './logTriggers'

export function handleTriggerEvent(
  event: TriggerEvent,
  log: CombatLogger,
  ctx: CombatContext,
  args?: MutationFilterArgs
): ActionResult {
  const triggers = validateModifiers(
    getTriggersByEvent(ctx.modifiers, event),
    []
  ) as Trigger[]
  const result: ActionResult = {
    addedModifiers: triggers
      .filter((trigger) => !!trigger.modifiers)
      .flatMap(
        (trigger) => (trigger.modifiers && trigger.modifiers(ctx)) ?? []
      ),
    mutations: triggers.filter((trigger) => !trigger.modifiers),
  }

  logTriggers(triggers, event, log, ctx)
  if (result.addedModifiers?.length) {
    logModifiers(result.addedModifiers, log, ctx, args)
  }
  if (result.mutations?.length) {
    logMutations(result.mutations, log, ctx, args)
  }

  return result
}
