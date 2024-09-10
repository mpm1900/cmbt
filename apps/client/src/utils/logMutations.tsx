import { LogSecondary, LogUnit } from '@/components/ui/log'
import { CombatLogger } from '@/hooks/state'
import {
  DamageAllId,
  DamageParent,
  DamageParentId,
  DamageTeamId,
  SetLastUsedActionId,
} from '@repo/game/data'
import {
  CombatContext,
  Mutation,
  MutationFilterArgs,
  Unit,
} from '@repo/game/types'
import { applyMutations } from '@repo/game/utils'

export function logMutations(
  mutations: Mutation[],
  log: CombatLogger,
  ctx: CombatContext,
  args?: MutationFilterArgs
) {
  args = args ?? {}
  const logMutations = mutations.filter((m) => m.id !== SetLastUsedActionId)
  const units = ctx.units.filter((u) =>
    logMutations.some((m) => m.filter(u, ctx, args))
  )
  units.forEach((unit, i) => {
    const unitMutations = logMutations.filter((m) => m.filter(unit, ctx, args))
    if (unitMutations.length > 0) {
      const diffs = applyMutations(unit, unitMutations)
      logMutationDiffs(unit, diffs, unitMutations, i, log, ctx)
    }
  })
}

export function logMutationDiffs(
  parent: Unit,
  diffs: Unit,
  mutations: Mutation[],
  index: number,
  log: CombatLogger,
  ctx: CombatContext
) {
  const name = parent.name
  const damageDiff = diffs.values.damage - parent.values.damage
  const pArmorDiff = diffs.values.physicalArmor - parent.values.physicalArmor
  const mArmorDiff = diffs.values.magicArmor - parent.values.magicArmor
  const ratio = (damageDiff / parent.stats.health) * 100
  const damageMutations = mutations.filter((m) =>
    [DamageAllId, DamageParentId, DamageTeamId].includes(m.id)
  )
  if (
    damageMutations.length > 0 &&
    mArmorDiff === 0 &&
    pArmorDiff === 0 &&
    damageDiff === 0
  ) {
    log(
      <LogSecondary className="italic">
        <LogUnit unit={parent} user={ctx.user} className="opacity-70">
          {name}
        </LogUnit>{' '}
        resisted all damage.
      </LogSecondary>,
      (index + 1) * 0.1
    )
  }
  if (damageDiff !== 0) {
    log(
      <LogSecondary className="italic">
        <LogUnit unit={parent} user={ctx.user} className="opacity-70">
          {name}
        </LogUnit>{' '}
        {damageDiff > 0 ? 'lost' : 'healed'}{' '}
        <span className="tracking-wide">
          {Math.abs(Math.min(ratio, 100)).toFixed(0)}%
        </span>{' '}
        of their health.
      </LogSecondary>,
      (index + 1) * 0.1
    )
  }
  if (pArmorDiff !== 0) {
    log(
      <LogSecondary className="italic">
        <LogUnit unit={parent} user={ctx.user} className="opacity-70">
          {name}
        </LogUnit>{' '}
        {pArmorDiff > 0 ? 'gained' : 'lost'} {Math.abs(pArmorDiff)} physical
        armor.
      </LogSecondary>,
      (index + 1) * 0.1
    )
  }
  if (mArmorDiff !== 0) {
    log(
      <LogSecondary className="italic">
        <LogUnit unit={parent} user={ctx.user} className="opacity-70">
          {name}
        </LogUnit>{' '}
        {mArmorDiff > 0 ? 'gained' : 'lost'} {Math.abs(mArmorDiff)} magic armor.
      </LogSecondary>,
      (index + 1) * 0.1
    )
  }
  if (mutations.some((m) => (m as DamageParent).evasionSuccess)) {
    log(
      <LogSecondary className="italic">
        <LogUnit unit={parent} user={ctx.user} className="opacity-70">
          {name}
        </LogUnit>{' '}
        evaded the attack!
      </LogSecondary>,
      (index + 1) * 0.1
    )
  }
}
