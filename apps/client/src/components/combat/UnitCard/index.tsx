import { Unit } from '@repo/game/types'
import { useActions, useCombat } from '../../../hooks/state'
import { applyModifiers } from '@repo/game/utils'
import { useCombatContext } from '../../../hooks'
import { useActiveUnit } from '../../../hooks/state'
import { CardContent } from '../../ui/card'
import { cn } from '@/lib/utils'
import { UnitStats } from './UnitStats'
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover'
import { Button } from '../../ui/button'
import { FaSearch } from 'react-icons/fa'
import { UnitModifiers } from './UnitModifiers'
import { UnitBars } from './UnitBars'
import { SwitchUnitId } from '@repo/game/data'

export type UnitDebugProps = {
  unit: Unit
  hideStats: boolean
}

export function UnitCard(props: UnitDebugProps) {
  const ctx = useCombatContext()
  const status = ctx.turn.status
  const result = ctx.turn.results[ctx.turn.results.length - 1]
  const { queue, removeWhere } = useActions()
  const { unit: activeUnit, setUnit: setActiveUnit } = useActiveUnit()
  const { unit } = applyModifiers(props.unit, ctx)
  const stagedItem = queue.find((i) => i.action.sourceId === unit.id)

  const isTargeted =
    status === 'running' && !!result?.targets?.find((t) => t.id === unit.id)

  const isActive =
    (status === 'running'
      ? result?.action?.sourceId === unit.id
      : status === 'waiting-for-input' && activeUnit?.id === unit.id) ||
    (isTargeted && result?.action?.id === SwitchUnitId)

  const isSelectable =
    status === 'waiting-for-input' && !unit.flags.isRecharging && !stagedItem

  return (
    <div>
      <div
        className={cn('w-[400px] rounded transition-colors ease-in-out', {
          'bg-slate-200': isActive,
          'bg-red-500/40': isTargeted && !isActive,
          'cursor-pointer': isSelectable,
        })}
        onClick={() => {
          if (isSelectable) {
            setActiveUnit(props.unit)
          }
        }}
      >
        <div className="p-2 pb-1 flex flex-row items-end justify-between">
          <div
            className={cn('font-semibold', {
              'text-slate-900': isActive,
            })}
          >
            {unit.name}
            {stagedItem && '*'}
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className={cn('p-2 h-full m-0', {
                  'text-slate-900': isActive,
                })}
                variant="ghost"
              >
                <FaSearch />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full text-center">
              <UnitStats
                unit={props.unit}
                stagedItem={stagedItem}
                onClearClick={() =>
                  removeWhere((i) => i.action.sourceId === unit.id)
                }
              />
            </PopoverContent>
          </Popover>
        </div>
        <CardContent className="p-2 pt-0">
          <UnitBars
            unit={unit}
            isActive={isActive}
            hideStats={props.hideStats}
          />
        </CardContent>
      </div>
      <UnitModifiers unit={props.unit} />
    </div>
  )
}
