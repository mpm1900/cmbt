import { ActionResolveOptions, CombatContext } from '../types'

export function modifyRenderContext(
  options: ActionResolveOptions | undefined,
  ctx: CombatContext
): CombatContext {
  return {
    ...ctx,
  }
}
