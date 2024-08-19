import { LogSecondary, LogUnit } from '@/components/ui/log'
import { CombatContext, Modifier } from '@repo/game/types'
import { validateModifiers } from '@repo/game/utils'
import { ModifierInline } from '@shared/ModifierInline'
import { StatusInline } from '@shared/StatusInline'
import { TextList } from '@shared/TextList'
import { getStatusesFromModifiers } from './getStatusesFromModifiers'

export function logModifiers(modifiers: Modifier[], ctx: CombatContext) {
  const units = ctx.units.filter((u) => modifiers.some((m) => m.filter(u, ctx)))
  units.forEach((unit, index) => {
    const unitModifiers = validateModifiers(
      modifiers.filter((m) => m.filter(unit, ctx)),
      ctx.modifiers
    )
    const nonStatusModifiers = unitModifiers.filter((m) => !m.statusId)
    const statuses = getStatusesFromModifiers(unitModifiers)

    if (nonStatusModifiers.length > 0) {
      ctx.log(
        <LogSecondary className="italic">
          <LogUnit teamId={unit.teamId} user={ctx.user} className="opacity-70">
            {unit.name}
          </LogUnit>{' '}
          gained{' '}
          <TextList>
            {unitModifiers
              .filter((m) => !m.statusId)
              .map((mod) => (
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
      ctx.log(
        <LogSecondary className="italic">
          <LogUnit teamId={unit.teamId} user={ctx.user} className="opacity-70">
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
