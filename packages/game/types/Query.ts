import { CombatContext } from './CombatContext'

export abstract class Query<T = unknown> {
  abstract resolve(ctx: CombatContext): T
}
