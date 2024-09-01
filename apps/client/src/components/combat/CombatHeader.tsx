import { useCombat } from '@/hooks/state'
import { cn } from '@/lib/utils'
import { Badge, BadgeProps } from '../ui/badge'
import { Separator } from '../ui/separator'

const StatusBadge = ({
  isActive,
  ...props
}: BadgeProps & { isActive: boolean }) => (
  <Badge
    {...props}
    variant={isActive ? 'default' : 'secondary'}
    className={cn({ 'bg-white/75 hover:bg-white/75': isActive })}
  />
)

export function CombatHeader() {
  const turn = useCombat((s) => s.turn)
  return (
    <div className="bg-slate-950 border-b flex items-center min-h-[48px]">
      <div className="w-[64px] bg-black p-2 text-center font-mono text-muted-foreground border-r">
        cmbt
      </div>
      <div className="flex flex-1 flex-row p-2 space-x-4 h-full justify-center items-center">
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
