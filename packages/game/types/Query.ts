import { CombatContext } from '.'

export abstract class Query<T = unknown> {
  abstract resolve(ctx: CombatContext): T
}
