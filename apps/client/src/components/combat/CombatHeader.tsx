import { useCombat } from '@/hooks/state'
import { Badge, BadgeProps } from '../ui/badge'
import { Separator } from '../ui/separator'
import { Turn, TurnStatus } from '@repo/game/types'
import { cn } from '@/lib/utils'

const StatusBadge = (props: BadgeProps & { isActive: boolean }) => (
  <Badge
    {...props}
    variant={props.isActive ? 'default' : 'secondary'}
    className={cn({ 'bg-white/75 hover:bg-white/75': props.isActive })}
  />
)

export function CombatHeader() {
  const turn = useCombat((s) => s.turn)
  return (
    <div className="bg-slate-950 p-3">
      <div className="flex flex-row space-x-4 h-full justify-center items-center">
        <StatusBadge isActive={turn.count === 0 && turn.status === 'cleanup'}>
          Pre-Game
        </StatusBadge>
        <Separator orientation="vertical" />
        <StatusBadge isActive={turn.status === 'upkeep'}>Upkeep</StatusBadge>
        <StatusBadge isActive={turn.status === 'main'}>Main</StatusBadge>
        <StatusBadge isActive={turn.status === 'combat'}>Combat</StatusBadge>
        <StatusBadge isActive={turn.count > 0 && turn.status === 'cleanup'}>
          Cleanup
        </StatusBadge>
        <Separator orientation="vertical" />
        <StatusBadge isActive={turn.status === 'done'}>Done</StatusBadge>
      </div>
    </div>
  )
}
