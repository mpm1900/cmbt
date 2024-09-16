import { LogSecondary, LogUnit } from '@/components/ui/log'
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
  ctx: CombatContext
) {
  const { addedModifiers: modifiers, mutations, shouldLog } = result

  logMiss(result, log, ctx)
  logCritical(result, log, ctx)

  if (mutations?.length) {
    logMutations(mutations, log, ctx)
  }
  if (modifiers?.length) {
    logModifiers(modifiers, log, ctx)
  }

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
