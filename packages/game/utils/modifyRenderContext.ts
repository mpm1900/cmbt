import { ActionRenderOptions, GameContext } from '../types'

export function modifyRenderContext(
  options: ActionRenderOptions | undefined,
  ctx: GameContext
): GameContext {
  return {
    ...ctx,
    log: options?.disableLogging ? () => {} : ctx.log,
  }
}
