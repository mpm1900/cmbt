import { useActiveUiUnit } from '@/hooks/state'
import { ActionButton } from './ActionButton'
import { ActiveAction } from './ActiveAction'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { useEffect, useState } from 'react'
import { Action, Id, Unit } from '@repo/game/types'
import { useGameContext } from '@/hooks'

export type ActionsListProps = {
  onConfirm: (action: Action, targetIds: Id[]) => void
}

export function ActionsList(props: ActionsListProps) {
  const { onConfirm } = props
  const unit = useActiveUiUnit((s) => s.unit)
  const ctx = useGameContext()
  const [activeAction, setActiveAction] = useState<Action>()
  const [targets, setTargets] = useState<Unit[]>([])

  function updateActiveAction(action: Action | undefined) {
    setActiveAction(action)
    if (action) {
      const possibleTargets = ctx.units.filter((unit) =>
        action.targets(unit, ctx)
      )
      if (possibleTargets.length <= action.maxTargetCount) {
        setTargets(possibleTargets)
      } else {
        setTargets([])
      }
    } else {
      setTargets([])
    }
  }

  useEffect(() => {
    updateActiveAction(undefined)
  }, [unit?.id])

  useEffect(() => {
    if (targets.length === activeAction?.maxTargetCount) {
      onConfirm(
        activeAction,
        targets.map((t) => t.id)
      )
      setActiveAction(undefined)
      setTargets([])
    }
  }, [targets.length])

  if (!unit) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select an Action for {unit.name}...</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {unit.actions
            //
            .slice(0, 4)
            .map((action) => (
              <ActionButton
                key={action.id}
                source={unit}
                action={action}
                isActive={action.id === activeAction?.id}
                onClick={() => {
                  updateActiveAction(action)
                }}
              />
            ))}
        </div>
        {activeAction && (
          <ActiveAction
            action={activeAction}
            source={unit}
            targets={targets}
            onTargetClick={(target, isSelected) => {
              setTargets((s) =>
                isSelected
                  ? s.filter((t) => t.id !== target.id)
                  : s.concat(target)
              )
            }}
            onConfirmClick={() => {
              onConfirm(
                activeAction,
                targets.map((t) => t.id)
              )
              setActiveAction(undefined)
              setTargets([])
            }}
          />
        )}
      </CardContent>
    </Card>
  )
}
