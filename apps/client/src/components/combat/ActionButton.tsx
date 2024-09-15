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

  return (
    <Button
      variant={isActive ? 'default' : 'secondary'}
      className="items-start h-full flex-col"
      onClick={onClick}
    >
      <div className="flex flex-1 w-full items-start justify-between min-h-[52px]">
        <div
          className={cn('text-lg text-wrap text-left', {
            'text-green-100': attackTypes.includes('physical'),
            'text-green-950': attackTypes.includes('physical') && isActive,
            'text-blue-200': attackTypes.includes('magic'),
            'text-blue-950': attackTypes.includes('magic') && isActive,
          })}
        >
          {renderer?.name}
        </div>
        <div className="flex flex-col h-full items-end justify-between py-1 min-w-[56px]">
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
          {renderer && (
            <div
              className={cn(
                'text-sm text-muted-foreground flex w-full space-x-2 items-center justify-end',
                {
                  'text-slate-700': isActive,
                }
              )}
            >
              {accuracy !== undefined && baseAccuracy !== undefined ? (
                <span
                  className={cn('num', {
                    '': accuracy === baseAccuracy,
                    'text-green-300': accuracy > baseAccuracy,
                    'text-red-300': accuracy < baseAccuracy,
                    'text-red-800': accuracy < baseAccuracy && isActive,
                  })}
                >
                  {accuracy}%
                </span>
              ) : (
                <span className="opacity-25">—</span>
              )}
              {renderer.cost && (
                <span className={cn({ 'text-red-300': !costCheck })}>
                  {renderer.cost(action)}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Button>
  )
}
