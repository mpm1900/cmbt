import { CommitResultOptions } from '@/hooks'
import { CombatLogger } from '@/hooks/state'
import { ActionResult, CombatContext } from '@repo/game/types'
import { logActionSuccessFailure } from './logActionSuccessFailure'
import { logCritical } from './logCritical'
import { logMiss } from './logMiss'
import { logModifiers } from './logModifiers'
import { logMutations } from './logMutations'

export function logResult(
  result: ActionResult,
  log: CombatLogger,
  context: CombatContext,
  options?: CommitResultOptions
) {
  const { addedModifiers: modifiers, mutations } = result
  if (!options?.enableLog) return

  logMiss(result, log, context)
  if (mutations?.length) {
    if (options?.enableLog) logMutations(mutations, log, context)
  }
  if (modifiers?.length) {
    if (options?.enableLog) logModifiers(modifiers, log, context)
  }
  logCritical(result, log, context)
  logActionSuccessFailure(result, log, context)
}
