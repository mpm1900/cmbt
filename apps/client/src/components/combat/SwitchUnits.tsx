import { useActions, useCombat } from '@/hooks/state'
import { SwitchUnitId } from '@repo/game/data'
import { Action, Unit } from '@repo/game/types'
import { useState } from 'react'
import { useCombatContext } from '../../hooks'
import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { SwitchUnitButton } from './SwitchUnitButton'

export type SwitchUnitsProps = {
  action: Action
  onClick?: (unit: Unit) => void
  onConfirm: (selectedTargets: Unit[]) => void
}

export function SwitchUnits(props: SwitchUnitsProps) {
  const { action, onClick, onConfirm } = props
  const combat = useCombat()
  const ctx = useCombatContext()
  const queue = useActions((s) => s.queue)
  const queuedSwitchActions = queue.filter(
    (i) => i.action.id === SwitchUnitId && action.teamId === ctx.user
  )
  const possibleTargets = action.targets.resolve(ctx)
  const [selectedTargets, setSelectedTargets] = useState<Unit[]>([])
  const confirmCount = Math.min(action.maxTargetCount, possibleTargets.length)

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
            .map((unit) => {
              return (
                <SwitchUnitButton
                  key={unit.id}
                  unit={unit}
                  action={action}
                  possibleTargets={possibleTargets}
                  selectedTargets={selectedTargets}
                  queuedSwitchActions={queuedSwitchActions}
                  onClick={() => {
                    if (selectedTargets.find((u) => u.id === unit.id)) {
                      setSelectedTargets((t) =>
                        t.filter((u) => u.id !== unit.id)
                      )
                    } else {
                      setSelectedTargets((t) => [...t, unit])
                    }
                    onClick && onClick(unit)
                  }}
                />
              )
            })}
        </div>
      </CardContent>
      {selectedTargets.length >= confirmCount && (
        <CardFooter className="justify-end">
          <Button onClick={() => onConfirm(selectedTargets)}>
            {combat.turn.count === 0 ? 'Start Combat' : 'Switch In'}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
