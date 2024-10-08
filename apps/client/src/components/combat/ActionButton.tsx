import { useCombatContext } from '@/hooks'
import { cn } from '@/lib/utils'
import { ActionRenderers } from '@/renderers'
import { Action, Unit } from '@repo/game/types'
import {
  applyModifiers,
  checkActionCost,
  getAttackTypesFromDamages,
} from '@repo/game/utils'
import { DamageListInline } from '@shared/DamageListInline'
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
  const attackTypes = getAttackTypesFromDamages(action.damages)
  const isDisabled = !action.filter(modified.unit, ctx)

  return (
    <Button
      variant={isActive ? 'default' : 'secondary'}
      className="items-start h-full flex-col"
      onClick={onClick}
    >
      <div className="flex-1 w-full min-h-[52px]">
        <div className=" h-full py-1 min-w-[56px] text-left">
          <div className="float-right mt-1">
            {action.damages.length > 0 ? (
              <DamageListInline
                damages={action.damages}
                color={isActive ? 'black' : undefined}
                className="space-x-2"
                children=""
                seporator=""
                conjunction=""
              />
            ) : (
              <span className="text-muted-foreground opacity-25">—</span>
            )}
          </div>
          {renderer && (
            <div
              className={cn(
                'float-right mt-2 clear-right text-sm text-muted-foreground flex space-x-2 items-center justify-end',
                {
                  'text-slate-700': isActive,
                }
              )}
            >
              {renderer.cost && (
                <span className={cn({ 'text-red-300': !costCheck })}>
                  {renderer.cost(action)}
                </span>
              )}
              {accuracy !== undefined && baseAccuracy !== undefined ? (
                <span
                  className={cn('num', {
                    '': accuracy === baseAccuracy,
                    'text-green-300': accuracy > baseAccuracy,
                    'text-green-800': accuracy > baseAccuracy && isActive,
                    'text-red-300': accuracy < baseAccuracy,
                    'text-red-800': accuracy < baseAccuracy && isActive,
                  })}
                >
                  {Math.min(accuracy, 100)}%
                </span>
              ) : (
                !renderer.cost && <span className="opacity-25">—</span>
              )}
            </div>
          )}
          <div
            className={cn('inline text-lg text-wrap text-left', {
              'text-green-100': attackTypes.includes('physical'),
              'text-green-950': attackTypes.includes('physical') && isActive,
              'text-blue-200': attackTypes.includes('magic'),
              'text-blue-950': attackTypes.includes('magic') && isActive,
              'text-red-300': isDisabled,
              'text-red-900': isDisabled && isActive,
            })}
          >
            {renderer?.name}
          </div>
        </div>
      </div>
    </Button>
  )
}
