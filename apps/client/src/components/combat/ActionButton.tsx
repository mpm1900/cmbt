import { useCombatContext } from '@/hooks'
import { cn } from '@/lib/utils'
import { ActionRenderers } from '@/renderers'
import { Action, Unit } from '@repo/game/types'
import { applyModifiers, checkActionCost } from '@repo/game/utils'
import { Button } from '../ui/button'

export type ActionButtonProps = {
  source: Unit
  action: Action
  isActive: boolean
  onClick?: () => void
}

export function ActionButton(props: ActionButtonProps) {
  const { action, source, isActive, onClick } = props
  const ctx = useCombatContext()
  const renderer = ActionRenderers[action.id]
  const modified = applyModifiers(source, ctx)
  const baseAccuracy = action.threshold(source)
  const accuracy = action.threshold(modified.unit)
  const costCheck = checkActionCost(action, source)
  const isDisabled = modified.unit.registry.actions.includes(action.id)
  const baseDamage = renderer?.baseDamage
    ? renderer.baseDamage(action)
    : undefined

  return (
    <Button
      variant={isActive ? 'default' : 'secondary'}
      className="items-start h-full flex-col"
      disabled={!costCheck || isDisabled}
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
          className={cn(
            'text-xs text-muted-foreground flex w-full justify-between',
            {
              'text-slate-700': isActive,
            }
          )}
        >
          {accuracy !== undefined && baseAccuracy !== undefined ? (
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
              <span></span>
            </span>
          ) : (
            <span className="opacity-25">—</span>
          )}
          <span className={cn({ 'text-red-300': !costCheck })}>
            {(renderer.cost && renderer.cost(action)) || (
              <span className="opacity-25">N/A</span>
            )}
          </span>
          <span>{baseDamage || <span className="opacity-25">N/A</span>}</span>
        </div>
      )}
    </Button>
  )
}
