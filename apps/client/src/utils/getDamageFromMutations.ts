import {
  CombatContext,
  Id,
  Mutation,
  MutationFilterArgs,
  Unit,
} from '@repo/game/types'
import { applyMutations } from '@repo/game/utils'

export function getDamageFromMutations(
  units: Unit[],
  mutations: Mutation[],
  ctx: CombatContext,
  args?: MutationFilterArgs
): Record<Id, number> {
  args = args ?? {}
  return units.reduce<Record<Id, number>>((damages, unit) => {
    const unitMutations = mutations.filter((m) => m.filter(unit, ctx, args))
    if (unitMutations.length > 0) {
      const diffs = applyMutations(unit, unitMutations)
      damages[unit.id] =
        (damages[unit.id] ?? 0) + diffs.values.damage - unit.values.damage
    }
    return damages
  }, {})
}
