import { LogSecondary, LogUnit } from '@/components/ui/log'
import { ModifierRenderers } from '@/renderers'
import { CombatContext, Modifier } from '@repo/game/types'
import { validateModifiers } from '@repo/game/utils'

export function logModifiers(modifiers: Modifier[], ctx: CombatContext) {
  console.log(modifiers)
  const units = ctx.units.filter((u) => modifiers.some((m) => m.filter(u, ctx)))
  units.forEach((unit) => {
    const unitModifiers = validateModifiers(
      modifiers.filter((m) => m.filter(unit, ctx)),
      ctx.modifiers
    )
    const renderers = unitModifiers.map((m) => ModifierRenderers[m.rid])
    if (renderers.length === 0) return
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
