import { LogSecondary, LogUnit } from '@/components/ui/log'
import { SetLastUsedActionId } from '@repo/game/data'
import { GameContext, Mutation, Unit } from '@repo/game/types'
import { applyMutation, ZERO_UNIT } from '@repo/game/utils'

export function logMutations(mutations: Mutation[], ctx: GameContext) {
  mutations
    .filter((m) => m.id !== SetLastUsedActionId)
    .forEach((mutation) => {
      const diffs = applyMutation(ZERO_UNIT, mutation)
      const parent = ctx.units.find((u) => u.id === mutation.parentId)
      if (!parent || mutation.filter(parent, ctx)) {
        logMutationDiffs(parent, diffs, ctx)
      }
    })
}

export function logMutationDiffs(
  parent: Unit | undefined,
  diffs: Unit,
  ctx: GameContext
) {
  const name = parent?.name ?? 'Multiple Units'
  if (diffs.values.damage > 0)
    ctx.log(
      <LogSecondary>
        <LogUnit teamId={parent?.teamId} user={ctx.user} className="opacity-70">
          {name}
        </LogUnit>{' '}
        take{!!parent && 's'} {diffs.values.damage} damage.
      </LogSecondary>
    )
}
