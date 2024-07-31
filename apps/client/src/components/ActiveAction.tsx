import { Card, CardContent } from './ui/card'
import { ActionTargets } from './ActionTargets'
import { Action, Unit } from '@repo/game/types'
import { ActionRenderers } from '@/renderers'
import { Badge } from './ui/badge'
import { useGameContext } from '@/hooks'
import { applyModifiers } from '@repo/game/utils'
import { cn } from '@/lib/utils'

export type ActiveActionProps = {
  action: Action
  source: Unit
  targets: Unit[]
  onTargetClick: (unit: Unit, isSelected: boolean) => void
  onConfirmClick: () => void
}

export function ActiveAction(props: ActiveActionProps) {
  const { action, source, targets, onConfirmClick, onTargetClick } = props
  const ctx = useGameContext()
  const renderer = ActionRenderers[action.id]
  const baseAccuracy = action.threshold(source)
  const modified = applyModifiers(source, ctx)
  const accuracy = action.threshold(modified.unit)

  return (
    <Card className="dark:bg-muted/40 space-y-2">
      <CardContent className="p-4 pt-6">
        <div className="mb-4 flex space-x-2">
          <Badge
            className={cn('border-none hover:text-white', {
              'bg-blue-600 text-blue-200': action.attackType === 'magic',
              'bg-green-600 text-green-100': action.attackType === 'physical',
            })}
            variant="outline"
          >
            {action.attackType}
          </Badge>
          {renderer.cost && (
            <Badge
              variant="outline"
              className="bg-slate-950 text-muted-foreground"
            >
              {renderer.costAlt ?? renderer.cost}
            </Badge>
          )}

          <Badge
            variant="outline"
            className="bg-slate-950 text-muted-foreground"
          >
            {accuracy !== undefined && baseAccuracy !== undefined ? (
              <span
                className={cn({
                  '': accuracy === baseAccuracy,
                  'text-green-300': accuracy > baseAccuracy,
                  'text-red-300': accuracy < baseAccuracy,
                })}
              >
                {accuracy}%
              </span>
            ) : (
              <span>--</span>
            )}
            <span className="pl-1">Accuracy</span>
          </Badge>
          {action.priority !== 0 && (
            <Badge
              variant="outline"
              className="bg-slate-950 text-muted-foreground"
            >
              Priority {action.priority}
            </Badge>
          )}
        </div>
        <div>
          <div>{renderer?.description(action)}</div>
          {renderer?.help && (
            <div className="text-sm text-muted-foreground/80 italic">
              {renderer?.help(action)}
            </div>
          )}
        </div>

        {renderer.lore && (
          <>
            <div className="bg-white/5 h-[1px] flex-1 mt-2" />
            <div className="text-center text-sm text-muted-foreground/70 italic mt-4">
              {renderer.lore(action)}
            </div>
          </>
        )}
        <div className="flex my-4 mb-3 flex-row items-center space-x-4 uppercase text-sm text-muted-foreground/40">
          <div className="bg-white/10 h-[1px] flex-1" />
          <span>select targets ({action.maxTargetCount})</span>
          <div className="bg-white/10 h-[1px] flex-1" />
        </div>
        <ActionTargets
          action={action}
          targets={targets}
          onTargetClick={onTargetClick}
          onConfirmClick={onConfirmClick}
        />
      </CardContent>
    </Card>
  )
}
