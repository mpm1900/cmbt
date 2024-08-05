import { CombatContext, Unit } from '../../types'
import { Query } from '../../types/Query'

export class EmptyArray extends Query<Unit[]> {
  constructor() {
    super()
  }

  resolve(ctx: CombatContext) {
    return []
  }
}
