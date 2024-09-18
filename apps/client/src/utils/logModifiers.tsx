import { LogSecondary, LogUnit } from '@/components/ui/log'
import { CombatLogger } from '@/hooks/state'
import { CombatContext, Modifier, MutationFilterArgs } from '@repo/game/types'
import { isUnitAliveCtx } from '@repo/game/utils'
import { ModifierInline } from '@shared/ModifierInline'
import { StatusInline } from '@shared/StatusInline'
import { TextList } from '@shared/TextList'
import { getStatusesFromModifiers } from './getStatusesFromModifiers'

export function logModifiers(
  modifiers: Modifier[],
  log: CombatLogger,
  ctx: CombatContext,
  args?: MutationFilterArgs
) {
  args = args ?? {}
  const units = ctx.units.filter(
    (u) =>
      isUnitAliveCtx(u, ctx) && modifiers.some((m) => m.filter(u, ctx, args))
  )
  units.forEach((unit, index) => {
    const unitHasModifier = (modifier: Modifier) =>
      unit.modifiers().some((m) => m.rtid === modifier.rtid)

    // NOTE: this used to be wraped in a validatModifiers() call
    const unitModifiers = modifiers.filter(
      (m) => m.filter(unit, ctx, args) && !unitHasModifier(m)
    )
    const nonStatusModifiers = unitModifiers.filter((m) => {
      return !m.statusId
    })

    const statuses = getStatusesFromModifiers(unitModifiers)

    if (nonStatusModifiers.length > 0) {
      log(
        <LogSecondary className="italic">
          <LogUnit unit={unit} user={ctx.user} className="opacity-70">
            {unit.name}
          </LogUnit>{' '}
          gained{' '}
          <TextList>
            {nonStatusModifiers.map((mod) => (
              <ModifierInline
                key={mod.rtid}
                modifier={mod}
                side="left"
                className="font-normal"
              />
            ))}
          </TextList>
        </LogSecondary>,
        (index + 1) * 0.1
      )
    }
    if (statuses.length > 0) {
      log(
        <LogSecondary className="italic">
          <LogUnit unit={unit} user={ctx.user} className="opacity-70">
            {unit.name}
          </LogUnit>{' '}
          gained{' '}
          <TextList>
            {statuses.map((status) => (
              <StatusInline
                key={status.id}
                status={status}
                side="left"
                className="font-normal"
              />
            ))}
          </TextList>
        </LogSecondary>,
        (index + 1 + nonStatusModifiers.length) * 0.1
      )
    }
  })
}
