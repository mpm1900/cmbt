import { LogSecondary, LogUnit } from '@/components/ui/log'
import { CommitResultOptions } from '@/hooks'
import { CombatLogger } from '@/hooks/state'
import { ActionResult, CombatContext } from '@repo/game/types'
import { logActionSuccessFailure } from './logActionSuccessFailure'
import { logCritical } from './logCritical'
import { logMiss } from './logMiss'
import { logMutations } from './logMutations'

export function logResult(
  result: ActionResult,
  log: CombatLogger,
  ctx: CombatContext,
  options?: CommitResultOptions
) {
  const { addedModifiers: modifiers, mutations } = result
  if (!options?.enableLog) return

  logMiss(result, log, ctx)
  if (mutations?.length) {
    if (options?.enableLog) logMutations(mutations, log, ctx)
  }
  logCritical(result, log, ctx)
  logActionSuccessFailure(result, log, ctx)
  if (result.protectedTargets) {
    result.protectedTargets.forEach((unit) => {
      log(
        <LogSecondary className="italic">
          <LogUnit unit={unit} user={ctx.user} className="opacity-70">
            {unit.name}
          </LogUnit>{' '}
          was protected.
        </LogSecondary>
      )
    })
  }
}
