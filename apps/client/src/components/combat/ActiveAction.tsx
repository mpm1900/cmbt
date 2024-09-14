import { useCombatContext } from '@/hooks'
import { cn } from '@/lib/utils'
import { ActionRenderers } from '@/renderers'
import { Action, Unit } from '@repo/game/types'
import { applyModifiers } from '@repo/game/utils'
import { Badge } from '../ui/badge'
import { Card, CardContent } from '../ui/card'
import { ActionTargets } from './ActionTargets'

export type ActiveActionProps = {
  action: Action
  source: Unit
  targets: Unit[]
  onTargetClick: (unit: Unit, isSelected: boolean) => void
  onConfirmClick: () => void
}

export function ActiveAction(props: ActiveActionProps) {
  const { action, source, targets, onConfirmClick, onTargetClick } = props
  const ctx = useCombatContext()
  const renderer = ActionRenderers[action.id]
  const baseAccuracy = action.threshold(source)
  const modified = applyModifiers(source, ctx)
  const accuracy = action.threshold(modified.unit)
  const critChance = action.criticalThreshold(modified.unit) ?? 0
  const critFactor = action.criticalFactor(modified.unit)

  return (
    <Card className="dark:bg-muted/40 space-y-2">
      <CardContent className="p-4 pt-6">
        <div className="flex space-x-2">
          {action.damage?.attackType && (
            <Badge
              className={cn('border-none uppercase hover:text-white mb-4', {
                'bg-blue-600 text-blue-200':
                  action.damage?.attackType === 'magic',
                'bg-green-600 text-green-100':
                  action.damage?.attackType === 'physical',
              })}
              variant="outline"
              style={{ fontSize: '0.6rem' }}
            >
              {action.damage?.attackType}
            </Badge>
          )}
          {renderer.cost && (
            <Badge
              variant="outline"
              className="bg-slate-950 text-muted-foreground mb-4"
            >
              {renderer.costAlt ?? (renderer.cost && renderer.cost(action))}
            </Badge>
          )}

          {accuracy !== undefined && baseAccuracy !== undefined && (
            <Badge
              variant="outline"
              className="bg-slate-950 text-muted-foreground mb-4 space-x-1 items-center"
            >
              <span
                className={cn({
                  '': accuracy === baseAccuracy,
                  'text-green-300': accuracy > baseAccuracy,
                  'text-red-300': accuracy < baseAccuracy,
                })}
              >
                {accuracy}%
              </span>

              <span>Accuracy</span>
            </Badge>
          )}
          {critChance > 0 && (
            <Badge
              variant="outline"
              className="bg-slate-950 text-muted-foreground mb-4 space-x-1 items-center"
            >
              <span>{critChance}%</span> <span>Crit</span>
            </Badge>
          )}
          {critFactor && (
            <Badge
              variant="outline"
              className="bg-slate-950 text-muted-foreground mb-4 space-x-1 items-center"
            >
              <span>{critFactor * 100}%</span>
              <span>Crit Damage</span>
            </Badge>
          )}
          {action.priority !== 0 && (
            <Badge
              variant="outline"
              className="bg-slate-950 text-muted-foreground mb-4"
            >
              Priority {action.priority}
            </Badge>
          )}
        </div>
        <div className="space-y-1">
          <div className="text-muted-foreground">
            {renderer?.description(action, { side: 'left' })}
          </div>
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
          source={modified.unit}
          targets={targets}
          onTargetClick={onTargetClick}
          onConfirmClick={onConfirmClick}
        />
      </CardContent>
    </Card>
  )
}
