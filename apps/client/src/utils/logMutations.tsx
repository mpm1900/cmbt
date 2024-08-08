import { LogSecondary, LogUnit } from '@/components/ui/log'
import { SetLastUsedActionId } from '@repo/game/data'
import { CombatContext, Mutation, Unit } from '@repo/game/types'
import { applyMutations } from '@repo/game/utils'

export function logMutations(mutations: Mutation[], ctx: CombatContext) {
  const logMutations = mutations.filter((m) => m.id !== SetLastUsedActionId)
  const units = ctx.units.filter((u) =>
    logMutations.some((m) => m.filter(u, ctx))
  )
  units.forEach((unit) => {
    const unitMutations = mutations.filter((m) => m.filter(unit, ctx))
    const diffs = applyMutations(unit, unitMutations)
    if (unitMutations.length > 0) {
      logMutationDiffs(unit, diffs, ctx)
    }
  })
}

export function logMutationDiffs(
  parent: Unit,
  diffs: Unit,
  ctx: CombatContext
) {
  const name = parent.name
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
