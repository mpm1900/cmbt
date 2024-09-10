import { useCombatContext } from '@/hooks'
import { cn } from '@/lib/utils'
import { Id } from '@repo/game/types'
import { TeamBenchUnit } from './TeamBenchUnit'

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
          return <TeamBenchUnit key={u.id} unit={u} index={i} />
        })}
    </div>
  )
}
