import { GameContext } from '.'

export abstract class Query<T = unknown> {
  abstract resolve(ctx: GameContext): T
}
