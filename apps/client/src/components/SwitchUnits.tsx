import { useGameContext } from '../hooks'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { applyModifiers } from '@repo/game/utils'
import { Action, Unit } from '@repo/game/types'
import { useActions } from '@/hooks/state'
import { SwitchUnitId } from '@repo/game/data'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

export type SwitchUnitsProps = {
  action: Action
  onClick: (action: Action, unit: Unit) => void
}

export function SwitchUnits(props: SwitchUnitsProps) {
  const { action, onClick } = props
  const ctx = useGameContext()
  const queue = useActions((s) => s.queue)
  const queuedSwitchActions = queue.filter(
    (i) => i.action.id === SwitchUnitId && action.teamId === ctx.user
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select a Unit...</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {ctx.units
            .filter((u) => u.teamId === action.teamId)
            .map((u) => {
              const { unit } = applyModifiers(u, ctx)
              const remainingHealth = Math.max(
                unit.stats.health - unit.values.damage,
                0
              )
              const isPending = !!queuedSwitchActions.find((i) =>
                i.targetIds.includes(u.id)
              )
              return (
                <Button
                  key={u.id}
                  variant={'secondary'}
                  disabled={!action.targets(u, ctx) || isPending}
                  className="items-start h-full flex-col"
                  onClick={() => onClick(action, u)}
                >
                  <div className="flex w-full items-center">
                    <span className="text-lg text-left flex-1 text-ellipsis overflow-hidden">
                      {u.name}
                    </span>
                    {unit.flags.isActive && (
                      <Badge variant="default" className="p-1 py-0 0">
                        Active
                      </Badge>
                    )}
                    {remainingHealth === 0 && (
                      <Badge variant="destructive" className="p-1 py-0">
                        Dead
                      </Badge>
                    )}
                    {isPending && (
                      <Badge
                        variant="outline"
                        className="p-1 py-0 bg-slate-950"
                      >
                        Pending
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    HP ({remainingHealth}/{unit.stats.health})
                  </span>
                </Button>
              )
            })}
        </div>
      </CardContent>
    </Card>
  )
}
