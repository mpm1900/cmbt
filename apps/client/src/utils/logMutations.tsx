import { LogSecondary, LogUnit } from '@/components/ui/log'
import { SetLastUsedActionId, ZERO_UNIT } from '@repo/game/data'
import { CombatContext, Mutation, Unit } from '@repo/game/types'
import { applyMutation } from '@repo/game/utils'

export function logMutations(mutations: Mutation[], ctx: CombatContext) {
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
  ctx: CombatContext
) {
  console.log('logging', parent?.name, diffs.values)
  const name = parent?.name ?? 'Multiple Units'
  if (diffs.values.damage > 0) {
    ctx.log(
      <LogSecondary>
        <LogUnit teamId={parent?.teamId} user={ctx.user} className="opacity-70">
          {name}
        </LogUnit>{' '}
        take{!!parent && 's'} {diffs.values.damage} damage.
      </LogSecondary>
    )
  }
  if (diffs.values.physicalArmor !== 0) {
    ctx.log(
      <LogSecondary>
        <LogUnit teamId={parent?.teamId} user={ctx.user} className="opacity-70">
          {name}
        </LogUnit>{' '}
        {diffs.values.physicalArmor > 0 ? 'gained' : 'lost'}{' '}
        {Math.abs(diffs.values.physicalArmor)} physical armor.
      </LogSecondary>
    )
  }
  if (diffs.values.magicArmor !== 0) {
    ctx.log(
      <LogSecondary>
        <LogUnit teamId={parent?.teamId} user={ctx.user} className="opacity-70">
          {name}
        </LogUnit>{' '}
        {diffs.values.magicArmor > 0 ? 'gained' : 'lost'}{' '}
        {Math.abs(diffs.values.magicArmor)} magic armor.
      </LogSecondary>
    )
  }
}
