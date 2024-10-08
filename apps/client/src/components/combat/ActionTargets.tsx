import { useCombatUi } from '@/hooks/state'
import { cn } from '@/lib/utils'
import { Action, Unit } from '@repo/game/types'
import { checkActionCost } from '@repo/game/utils'
import { useEffect } from 'react'
import { useCombatContext } from '../../hooks'
import { Button } from '../ui/button'

export type UnitActionTargetsProps = {
  action: Action
  source: Unit
  targets: Unit[]
  onTargetClick: (unit: Unit, isSelected: boolean) => void
  onConfirmClick: () => void
}

export function ActionTargets(props: UnitActionTargetsProps) {
  const { action, source, targets, onConfirmClick, onTargetClick } = props
  const ctx = useCombatContext()
  const { setHoverTargetUnitIds } = useCombatUi()
  const possibleTargets = action.targets.resolve(ctx)
  const costFail = !checkActionCost(action, source)
  const cooldown = (ctx.actionCooldowns[action.sourceId] ?? {})[action.id] ?? 0
  const isDisabled = !action.filter(source, ctx)

  useEffect(() => {
    if (
      action.maxTargetCount > 0 &&
      possibleTargets.length > 0 &&
      targets.length === Math.min(action.maxTargetCount, possibleTargets.length)
    ) {
      onConfirmClick()
    }
  }, [targets.length])

  return (
    <div className="space-y-1">
      <div className="text-sm text-center italic">
        {possibleTargets.length === 0 && (
          <div className="space-y-4">
            <div className="text-muted-foreground/40 ">
              {action.maxTargetCount === 0
                ? 'This action does not require target selection.'
                : 'No targets available for this action.'}
            </div>
            {action.maxTargetCount === 0 && (
              <Button
                className={cn('h-full px-8', {
                  isDisabled: 'cursor-not-allowed',
                })}
                variant="outline"
                disabled={isDisabled}
                onClick={() => {
                  setHoverTargetUnitIds(undefined)
                  onConfirmClick()
                }}
                onMouseOver={() =>
                  setHoverTargetUnitIds(
                    action.mapTargets([], ctx).map((t) => t.id)
                  )
                }
                onMouseLeave={() => setHoverTargetUnitIds(undefined)}
              >
                Confirm Action
              </Button>
            )}
          </div>
        )}
      </div>
      <div className="space-x-2 flex justify-center flex-wrap">
        {possibleTargets.map((target) => {
          const isSelected = targets.some((t) => t.id === target.id)

          return (
            <Button
              key={target.id}
              className={cn('h-full px-8 mb-2', {
                isDisabled: 'cursor-not-allowed',
              })}
              disabled={isDisabled}
              variant={isSelected ? 'default' : 'outline'}
              onClick={() => {
                setHoverTargetUnitIds(undefined)
                onTargetClick(target, isSelected)
              }}
              onMouseOver={() => setHoverTargetUnitIds([target.id])}
              onMouseLeave={() => setHoverTargetUnitIds(undefined)}
            >
              {target.name}
            </Button>
          )
        })}
      </div>
      {costFail && (
        <div className="text-red-300 text-center text-xs">Cannot pay costs</div>
      )}
      {cooldown > 0 && (
        <div className="text-red-300 text-center text-xs">
          On cooldown for {cooldown} turn{cooldown > 1 && `(s)`}
        </div>
      )}
    </div>
  )
}
