import { useCombatContext } from '@/hooks'
import { cn } from '@/lib/utils'
import { getActiveUnitModifiers } from '@/utils'
import { Unit } from '@repo/game/types'
import {
  applyModifiers,
  getModifiersFromUnit,
  isUnitAlive,
} from '@repo/game/utils'
import { UnitDetails } from '@shared/UnitDetails'
import { Badge } from '../ui/badge'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'

export type TeamBenchUnitProps = {
  index: number
  unit: Unit
}

export function TeamBenchUnit(props: TeamBenchUnitProps) {
  const ctx = useCombatContext()
  const { unit } = applyModifiers(props.unit, ctx)
  const modifiers = unit.flags.isActive
    ? getActiveUnitModifiers(props.unit, ctx)
    : getModifiersFromUnit(props.unit)
  const isAlive = isUnitAlive(unit)

  const badge = (
    <Badge
      variant={
        !isAlive ? 'destructive' : unit.flags.isActive ? 'default' : 'secondary'
      }
      className={cn({
        'opacity-40 line-through': !isAlive,
        'cursor-pointer': unit.teamId === ctx.user,
      })}
    >
      {unit.teamId === ctx.user ||
      unit.flags.isActive ||
      unit.metadata.hasBeenSeen ||
      !isAlive
        ? unit.name
        : props.index + 1}
    </Badge>
  )

  if (unit.teamId !== ctx.user) return badge
  return (
    <HoverCard openDelay={400} closeDelay={100}>
      <HoverCardTrigger>{badge}</HoverCardTrigger>
      <HoverCardContent
        side="top"
        className="w-full"
        collisionPadding={32}
        sideOffset={8}
      >
        <UnitDetails unit={unit} original={props.unit} modifiers={modifiers} />
      </HoverCardContent>
    </HoverCard>
  )
}
