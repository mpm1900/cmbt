import { useCombatContext } from '../../hooks'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { applyModifiers } from '@repo/game/utils'
import { Action, Unit } from '@repo/game/types'
import { useActions } from '@/hooks/state'
import { SwitchUnitId } from '@repo/game/data'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { useState } from 'react'

export type SwitchUnitsProps = {
  action: Action
  onClick?: (unit: Unit) => void
  onConfirm: (selectedTargets: Unit[]) => void
}

export function SwitchUnits(props: SwitchUnitsProps) {
  const { action, onClick, onConfirm } = props
  const ctx = useCombatContext()
  const queue = useActions((s) => s.queue)
  const queuedSwitchActions = queue.filter(
    (i) => i.action.id === SwitchUnitId && action.teamId === ctx.user
  )

  const targets = action.targets.resolve(ctx)
  const [selectedTargets, setSelectedTargets] = useState<Unit[]>([])

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Select{' '}
          {action.maxTargetCount === 1
            ? 'a unit'
            : `${action.maxTargetCount} units`}
          ...
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {ctx.units
            .filter((u) => u.teamId === action.teamId)
            .map((u) => {
              const { unit } = applyModifiers(u, ctx)
              const isSelected = !!selectedTargets.find((t) => t.id === u.id)
              const remainingHealth = Math.max(
                unit.stats.health - unit.values.damage,
                0
              )
              const isPending = !!queuedSwitchActions.find((i) =>
                i.targetIds.includes(u.id)
              )
              return (
                <Button
                  key={u.id}
                  variant={isSelected ? 'default' : 'secondary'}
                  disabled={
                    !targets.find((t) => t.id === u.id) ||
                    isPending ||
                    (!isSelected &&
                      selectedTargets.length === action.maxTargetCount)
                  }
                  className="items-start h-full flex-col"
                  onClick={() => {
                    if (selectedTargets.find((u) => u.id === unit.id)) {
                      setSelectedTargets((t) =>
                        t.filter((u) => u.id !== unit.id)
                      )
                    } else {
                      setSelectedTargets((t) => [...t, unit])
                    }
                    onClick && onClick(u)
                  }}
                >
                  <div className="flex w-full items-center">
                    <span className="text-lg text-left flex-1 text-ellipsis overflow-hidden">
                      {u.name}
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
                      <Badge
                        variant="outline"
                        className="p-1 py-0 bg-slate-950"
                      >
                        Pending
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    HP ({remainingHealth}/{unit.stats.health})
                  </span>
                </Button>
              )
            })}
        </div>
      </CardContent>
      {selectedTargets.length === action.maxTargetCount && (
        <CardFooter className="justify-end">
          <Button onClick={() => onConfirm(selectedTargets)}>
            {ctx.turn.count === 0 ? 'Start Combat' : 'Switch In'}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
