import { ActionRenderOptions, CombatContext } from '../types'

export function modifyRenderContext(
  options: ActionRenderOptions | undefined,
  ctx: CombatContext
): CombatContext {
  return {
    ...ctx,
    log: options?.disableLogging ? () => {} : ctx.log,
  }
}
