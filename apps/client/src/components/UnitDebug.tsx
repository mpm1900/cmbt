import { Unit } from '@repo/game/types'
import { useActions } from '../hooks/state'
import { StatDebug } from './StatDebug'
import { applyModifiers } from '@repo/game/utils'
import { useGameContext } from '../hooks'
import { ActionRenderers, ModifierRenderers } from '../renderers'
import { RequireTurnStatus } from './RequireTurnStatus'
import { useActiveUiUnit } from '../hooks/state'
import { CardContent } from './ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { HealthBar } from './ui/HealthBar'
import { ModifierIcon } from './ModifierIcon'

export type UnitDebugProps = {
  unit: Unit
  hideStats: boolean
}

export function UnitDebug(props: UnitDebugProps) {
  const ctx = useGameContext()
  const { queue, removeWhere } = useActions()
  const { unit: activeUnit, setUnit: setActiveUnit } = useActiveUiUnit()
  const result = applyModifiers(props.unit, ctx)
  const { unit, appliedModifiers, registeredTriggers } = result
  const stagedItem = queue.find((i) => i.action.sourceId === unit.id)
  const isActive = activeUnit?.id === unit.id
  const remainingHealth = Math.max(unit.stats.health - unit.values.damage, 0)
  const ratio = (unit.stats.focus / unit.stats.energy) * 100

  return (
    <div
      className={cn('cursor-pointer w-[400px] rounded', {
        'bg-slate-600': isActive,
      })}
      onClick={() => {
        if (!unit.flags.isRecharging && !stagedItem) {
          setActiveUnit(props.unit)
        }
      }}
    >
      <div className="p-2 pb-1 flex flex-row items-center justify-between">
        <div>
          {unit.name}
          {stagedItem && '*'}
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button className="p-1 h-full m-0" variant="outline">
              details
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full text-center">
            <div>
              <span>
                <strong>HP</strong> ({remainingHealth}/{unit.stats.health})
              </span>
              {' - '}
              <span>
                <strong>FP</strong> ({Math.max(unit.values.focus, 0)}/
                {unit.stats.focus})
              </span>
              {' - '}
              <span>
                <strong>SP</strong> ({Math.max(unit.values.energy, 0)}/
                {unit.stats.energy})
              </span>
            </div>
            <div>
              <strong>Physical</strong>:{' '}
              <StatDebug stat="physical" unit={unit} comp={props.unit} />,{' '}
              <strong>Defense</strong>:{' '}
              <StatDebug stat="defense" unit={unit} comp={props.unit} />,{' '}
              <strong>Magic</strong>:{' '}
              <StatDebug stat="magic" unit={unit} comp={props.unit} />,{' '}
              <strong>Speed</strong>:{' '}
              <StatDebug stat="speed" unit={unit} comp={props.unit} />
            </div>
            <div>
              <strong>Fire</strong>:{' '}
              <StatDebug stat="fireNegation" unit={unit} comp={props.unit} />,{' '}
              <strong>Force</strong>:{' '}
              <StatDebug stat="forceNegation" unit={unit} comp={props.unit} />,{' '}
              <strong>Lightning</strong>:{' '}
              <StatDebug
                stat="lightningNegation"
                unit={unit}
                comp={props.unit}
              />
            </div>
            {stagedItem && (
              <span>
                {`${ActionRenderers[stagedItem.action.id ?? '']?.name} => [${ctx.units
                  .filter((u) => stagedItem.targetIds.includes(u.id))
                  .map((u) => u.name)
                  .join(',')}]`}
                <RequireTurnStatus status="waiting-for-input">
                  <a
                    onClick={() =>
                      removeWhere((i) => i.action.sourceId === unit.id)
                    }
                  >
                    [ Clear ]
                  </a>
                </RequireTurnStatus>
              </span>
            )}
          </PopoverContent>
        </Popover>
      </div>
      <CardContent className="p-2 pt-0">
        <div className="space-y-1">
          <HealthBar unit={unit} />
          {!props.hideStats && (
            <div className="flex space-x-1">
              {unit.stats.focus > 0 && (
                <Progress
                  value={
                    (Math.max(unit.values.focus, 0) / unit.stats.focus) * 100
                  }
                  className="bg-b h-1"
                  variant="bg-blue-400"
                  style={{ width: `${ratio}%` }}
                />
              )}
              {unit.stats.energy > 0 && (
                <Progress
                  value={
                    (Math.max(unit.values.energy, 0) / unit.stats.energy) * 100
                  }
                  className="bg-b h-1"
                  variant="bg-green-200"
                />
              )}
            </div>
          )}
        </div>

        <div className="mt-2 space-x-2 flex flex-row">
          {[...appliedModifiers, ...registeredTriggers].map((m) => {
            const r = ModifierRenderers[m.rid]
            return (
              <ModifierIcon
                key={m.rid}
                modifier={m}
                fallback={
                  <span key={m.rtid} className="font-bold">
                    {r.Inline ? <r.Inline /> : `${r?.name ?? m.id}`}
                  </span>
                }
              />
            )
          })}
        </div>
      </CardContent>
    </div>
  )
}
