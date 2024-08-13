import { useCombatContext } from '@/hooks'
import { cn } from '@/lib/utils'
import { Id } from '@repo/game/types'
import { applyModifiers, isUnitAlive } from '@repo/game/utils'
import { Badge } from '../ui/badge'

export type TeamBenchProps = {
  className?: string
  teamId: Id | undefined
}

export function TeamBench(props: TeamBenchProps) {
  const { teamId, className } = props
  const ctx = useCombatContext()

  return (
    <div className={cn('p-2 space-x-2 flex', className)}>
      {ctx.units
        .filter((u) => u.teamId === teamId)
        .map((u, i) => {
          const { unit } = applyModifiers(u, ctx)
          return (
            <Badge
              key={u.id}
              variant={
                !isUnitAlive(unit)
                  ? 'destructive'
                  : unit.flags.isActive
                    ? 'default'
                    : 'secondary'
              }
              className={cn({
                'opacity-40 line-through': !isUnitAlive(unit),
              })}
            >
              {teamId === ctx.user ||
              unit.flags.isActive ||
              unit.metadata.hasBeenSeen ||
              !isUnitAlive(unit)
                ? u.name
                : i + 1}
            </Badge>
          )
        })}
    </div>
  )
}
