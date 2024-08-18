import { LogSecondary, LogUnit } from '@/components/ui/log'
import { DamageParent, SetLastUsedActionId, ZERO_UNIT } from '@repo/game/data'
import { CombatContext, Mutation, Unit } from '@repo/game/types'
import { applyMutations } from '@repo/game/utils'

export function logMutations(mutations: Mutation[], ctx: CombatContext) {
  const logMutations = mutations.filter((m) => m.id !== SetLastUsedActionId)
  const units = ctx.units.filter((u) =>
    logMutations.some((m) => m.filter(u, ctx))
  )
  units.forEach((unit, i) => {
    const unitMutations = logMutations.filter((m) => m.filter(unit, ctx))
    if (unitMutations.length > 0) {
      const diffs = applyMutations(ZERO_UNIT, unitMutations)
      logMutationDiffs(unit, diffs, unitMutations, i, ctx)
    }
  })
}

export function logMutationDiffs(
  parent: Unit,
  diffs: Unit,
  mutations: Mutation[],
  index: number,
  ctx: CombatContext
) {
  const name = parent.name
  const ratio = (diffs.values.damage / parent.stats.health) * 100
  if (diffs.values.damage !== 0) {
    ctx.log(
      <LogSecondary className="italic">
        <LogUnit teamId={parent?.teamId} user={ctx.user} className="opacity-70">
          {name}
        </LogUnit>{' '}
        {diffs.values.damage > 0 ? 'lost' : 'healed'}{' '}
        <span className="tracking-wide">
          {(ratio * (ratio > 0 ? 1 : -1)).toFixed(0)}%
        </span>{' '}
        of their health.
      </LogSecondary>,
      (index + 1) * 0.1
    )
  }
  if (diffs.values.physicalArmor !== 0) {
    ctx.log(
      <LogSecondary className="italic">
        <LogUnit teamId={parent?.teamId} user={ctx.user} className="opacity-70">
          {name}
        </LogUnit>{' '}
        {diffs.values.physicalArmor > 0 ? 'gained' : 'lost'}{' '}
        {Math.abs(diffs.values.physicalArmor)} physical armor.
      </LogSecondary>,
      (index + 1) * 0.1
    )
  }
  if (diffs.values.magicArmor !== 0) {
    ctx.log(
      <LogSecondary className="italic">
        <LogUnit teamId={parent?.teamId} user={ctx.user} className="opacity-70">
          {name}
        </LogUnit>{' '}
        {diffs.values.magicArmor > 0 ? 'gained' : 'lost'}{' '}
        {Math.abs(diffs.values.magicArmor)} magic armor.
      </LogSecondary>,
      (index + 1) * 0.1
    )
  }
  if (mutations.some((m) => (m as DamageParent).evasionSuccess)) {
    ctx.log(
      <LogSecondary className="italic">
        <LogUnit teamId={parent?.teamId} user={ctx.user} className="opacity-70">
          {name}
        </LogUnit>{' '}
        evaded the attack!
      </LogSecondary>,
      (index + 1) * 0.1
    )
  }
}
