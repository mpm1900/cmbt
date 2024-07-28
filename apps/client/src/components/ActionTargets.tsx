import { Action, Unit } from '@repo/game/types'
import { useGameContext } from '../hooks'
import { Button } from './ui/button'

export type UnitActionTargetsProps = {
  action: Action
  targets: Unit[]
  onTargetClick: (unit: Unit, isSelected: boolean) => void
  onConfirmClick: () => void
}

export function ActionTargets(props: UnitActionTargetsProps) {
  const { action, targets, onConfirmClick, onTargetClick } = props
  const ctx = useGameContext()
  const possibleTargets = ctx.units.filter((u) => action.targets(u, ctx))

  return (
    <div>
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
                className="h-full px-8"
                variant="outline"
                onClick={() => onConfirmClick()}
              >
                Confirm Action
              </Button>
            )}
          </div>
        )}
      </div>
      <div className="space-x-2 flex justify-center">
        {possibleTargets.map((target) => {
          const isSelected = targets.some((t) => t.id === target.id)

          return (
            <Button
              key={target.id}
              className="h-full px-8"
              variant={isSelected ? 'default' : 'outline'}
              onClick={() => onTargetClick(target, isSelected)}
            >
              {target.name}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
