import { CombatContext, Id, Query, Unit } from '../../types'

export class EmptyArray extends Query<Unit[]> {
  constructor() {
    super()
  }

  resolve(ctx: CombatContext) {
    return []
  }
}
