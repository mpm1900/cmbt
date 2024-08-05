import { LogSecondary, LogUnit } from '@/components/ui/log'
import { ModifierRenderers } from '@/renderers'
import { CombatContext, Modifier } from '@repo/game/types'

export function logModifiers(modifiers: Modifier[], ctx: CombatContext) {
  const parentIds = modifiers.map((m) => m.parentId)
  const units = ctx.units.filter((u) => parentIds.includes(u.id))
  units.forEach((unit) => {
    const unitModifiers = modifiers.filter((m) => m.parentId === unit.id)
    const renderers = unitModifiers.map((m) => ModifierRenderers[m.rid])
    ctx.log(
      <LogSecondary>
        <LogUnit teamId={unit.teamId} user={ctx.user}>
          {unit.name}
        </LogUnit>{' '}
        gained{' '}
        {renderers.map(
          (r, i) =>
            `${i === renderers.length - 1 && renderers.length > 1 ? ' and ' : i !== 0 ? ', ' : ''}${r?.name}`
        )}
      </LogSecondary>
    )
  })
}
