import { useGameContext } from '@/hooks'
import { Id } from '@repo/game/types'
import { Badge } from './ui/badge'
import { applyModifiers } from '@repo/game/utils'
import { cn } from '@/lib/utils'

export type TeamBenchProps = {
  teamId: Id | undefined
}

export function TeamBench(props: TeamBenchProps) {
  const { teamId } = props
  const ctx = useGameContext()

  return (
    <div className="p-2 space-x-2">
      {ctx.units
        .filter((u) => u.teamId === teamId)
        .map((u) => {
          const { unit } = applyModifiers(u, ctx)
          return (
            <Badge
              key={u.id}
              variant={unit.flags.isActive ? 'default' : 'secondary'}
              className={cn({
                'opacity-40': unit.values.damage >= unit.stats.health,
              })}
            >
              {u.name}
            </Badge>
          )
        })}
    </div>
  )
}
