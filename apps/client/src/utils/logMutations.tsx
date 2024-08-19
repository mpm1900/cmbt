import { LogSecondary, LogUnit } from '@/components/ui/log'
import { DamageParent, SetLastUsedActionId } from '@repo/game/data'
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
      const diffs = applyMutations(unit, unitMutations)
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
  const damageDiff = diffs.values.damage - parent.values.damage
  const pArmorDiff = diffs.values.physicalArmor - parent.values.physicalArmor
  const mArmorDiff = diffs.values.magicArmor - parent.values.magicArmor
  const ratio = (damageDiff / parent.stats.health) * 100
  if (damageDiff !== 0) {
    ctx.log(
      <LogSecondary className="italic">
        <LogUnit teamId={parent?.teamId} user={ctx.user} className="opacity-70">
          {name}
        </LogUnit>{' '}
        {damageDiff > 0 ? 'lost' : 'healed'}{' '}
        <span className="tracking-wide">
          {(ratio * (ratio > 0 ? 1 : -1)).toFixed(0)}%
        </span>{' '}
        of their health.
      </LogSecondary>,
      (index + 1) * 0.1
    )
  }
  if (pArmorDiff !== 0) {
    ctx.log(
      <LogSecondary className="italic">
        <LogUnit teamId={parent?.teamId} user={ctx.user} className="opacity-70">
          {name}
        </LogUnit>{' '}
        {pArmorDiff > 0 ? 'gained' : 'lost'} {Math.abs(pArmorDiff)} physical
        armor.
      </LogSecondary>,
      (index + 1) * 0.1
    )
  }
  if (mArmorDiff !== 0) {
    ctx.log(
      <LogSecondary className="italic">
        <LogUnit teamId={parent?.teamId} user={ctx.user} className="opacity-70">
          {name}
        </LogUnit>{' '}
        {mArmorDiff > 0 ? 'gained' : 'lost'} {Math.abs(mArmorDiff)} magic armor.
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
