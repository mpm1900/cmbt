import { Action, Unit } from '@repo/game/types'
import { Button } from './ui/button'
import { ActionRenderers } from '@/renderers'
import { useGameContext } from '@/hooks'
import { applyModifiers } from '@repo/game/utils'
import { Badge } from './ui/badge'
import { cn } from '@/lib/utils'

export type ActionButtonProps = {
  source: Unit
  action: Action
  isActive: boolean
  onClick?: () => void
}

export function ActionButton(props: ActionButtonProps) {
  const { action, source, isActive, onClick } = props
  const ctx = useGameContext()
  const renderer = ActionRenderers[action.id]
  const modified = applyModifiers(source, ctx)
  const baseAccuracy = action.threshold(source)
  const accuracy = action.threshold(modified.unit)
  const costCheck = action.checkCost(source)

  return (
    <Button
      variant={isActive ? 'default' : 'secondary'}
      className="items-start h-full flex-col"
      disabled={!costCheck}
      onClick={onClick}
    >
      <span
        className={cn('text-lg', {
          'text-green-100': action.attackType === 'physical',
          'text-green-950': action.attackType === 'physical' && isActive,
          'text-blue-200': action.attackType === 'magic',
          'text-blue-950': action.attackType === 'magic' && isActive,
        })}
      >
        {renderer?.name}
      </span>
      {renderer && (
        <div
          className={cn('text-xs text-muted-foreground space-x-2', {
            'text-slate-700': isActive,
          })}
        >
          {renderer.cost && (
            <span className={cn({ 'text-red-300': !costCheck })}>
              {renderer.cost}
            </span>
          )}
          {accuracy !== undefined && baseAccuracy !== undefined && (
            <span>
              <span
                className={cn({
                  '': accuracy === baseAccuracy,
                  'text-green-300': accuracy > baseAccuracy,
                  'text-red-300': accuracy < baseAccuracy,
                  'text-red-800': accuracy < baseAccuracy && isActive,
                })}
              >
                {accuracy}%
              </span>
              <span> Accuracy</span>
            </span>
          )}
        </div>
      )}
    </Button>
  )
}
