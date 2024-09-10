import { useCombatContext } from '@/hooks'
import { Action, ActionsQueueItem, Unit } from '@repo/game/types'
import { applyModifiers, getUnitBase } from '@repo/game/utils'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

export type SwitchUnitButtonProps = {
  unit: Unit
  action: Action
  possibleTargets: Unit[]
  selectedTargets: Unit[]
  queuedSwitchActions: ActionsQueueItem[]
  onClick?: (unit: Unit) => void
}
export function SwitchUnitButton(props: SwitchUnitButtonProps) {
  const {
    action,
    possibleTargets,
    selectedTargets,
    queuedSwitchActions,
    onClick,
  } = props
  const ctx = useCombatContext()
  const { unit } = applyModifiers(props.unit, ctx)
  const remainingHealth = Math.max(unit.stats.health - unit.values.damage, 0)
  const isSelected = selectedTargets.some((t) => t.id === unit.id)
  const isPending = !!queuedSwitchActions.find((i) =>
    i.targetIds.includes(unit.id)
  )
  const { base } = getUnitBase(unit.baseId)
  return (
    <Button
      variant={isSelected ? 'default' : 'secondary'}
      disabled={
        !possibleTargets.find((t) => t.id === unit.id) ||
        isPending ||
        (!isSelected && selectedTargets.length === action.maxTargetCount)
      }
      className="items-start h-full flex-col"
      onClick={() => {
        onClick && onClick(props.unit)
      }}
    >
      <div className="flex w-full items-center">
        <span className="text-lg text-left flex-1 text-ellipsis overflow-hidden">
          {unit.name} ({String(unit.metadata.inactiveTurns)})
        </span>
        {unit.flags.isActive && (
          <Badge variant="default" className="p-1 py-0 0">
            Active
          </Badge>
        )}
        {remainingHealth === 0 && (
          <Badge variant="destructive" className="p-1 py-0">
            Dead
          </Badge>
        )}
        {isPending && (
          <Badge variant="outline" className="p-1 py-0 bg-slate-950">
            Pending
          </Badge>
        )}
      </div>
      <div className="flex justify-between w-full">
        <span className="text-xs text-muted-foreground">
          HP ({remainingHealth}/{unit.stats.health})
        </span>
        <span className="text-xs text-muted-foreground/40">{base?.name}</span>
      </div>
    </Button>
  )
}
