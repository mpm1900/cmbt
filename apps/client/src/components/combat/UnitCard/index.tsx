import { Unit } from '@repo/game/types'
import { useActions } from '../../../hooks/state'
import { applyModifiers } from '@repo/game/utils'
import { useCombatContext } from '../../../hooks'
import { useCombatUi } from '../../../hooks/state'
import { CardContent } from '../../ui/card'
import { cn } from '@/lib/utils'
import { UnitStats } from './UnitStats'
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover'
import { Button } from '../../ui/button'
import { FaSearch } from 'react-icons/fa'
import { FaShieldHalved } from 'react-icons/fa6'
import { UnitModifiers } from './UnitModifiers'
import { UnitBars } from './UnitBars'
import { SwitchUnitId } from '@repo/game/data'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'

export type UnitCardProps = {
  unit: Unit
  hideStats: boolean
  reverse?: boolean
}

export function UnitCard(props: UnitCardProps) {
  const { reverse, hideStats } = props
  const ctx = useCombatContext()
  const status = ctx.turn.status
  const result = ctx.turn.results[ctx.turn.results.length - 1]
  const { queue, removeWhere } = useActions()
  const { activeUnit: activeUnit, setActiveUnit: setActiveUnit } = useCombatUi()
  const { unit } = applyModifiers(props.unit, ctx)
  const stagedItem = queue.find((i) => i.action.sourceId === unit.id)

  const isTargeted =
    status === 'combat' && !!result?.targets?.find((t) => t.id === unit.id)

  const isActive =
    (status === 'combat'
      ? result?.action?.sourceId === unit.id
      : status === 'main' && activeUnit?.id === unit.id) ||
    (isTargeted && result?.action?.id === SwitchUnitId)

  const isSelectable = status === 'main' && !unit.flags.isStunned && !stagedItem

  return (
    <motion.div
      layout
      className={cn('flex flex-col', { 'flex-col-reverse': reverse })}
    >
      <div
        className={cn(
          'w-[400px] rounded transition-colors ease-in-out bg-slate-950 border',
          {
            'hover:bg-slate-900': isSelectable,
            'bg-slate-200 hover:bg-slate-200': isActive,
            'bg-red-500/40': isTargeted && !isActive,
            'cursor-pointer': isSelectable,
          }
        )}
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
          <div className="flex items-center space-x-2">
            {unit.values.physicalArmor > 0 && (
              <Badge
                variant="outline"
                className="space-x-1 bg-green-600 text-white"
              >
                <FaShieldHalved />
                <span>{unit.values.physicalArmor}</span>
              </Badge>
            )}
            {unit.values.magicArmor > 0 && (
              <Badge
                variant="outline"
                className="space-x-1 bg-blue-600 text-white"
              >
                <FaShieldHalved />
                <span>{unit.values.magicArmor}</span>
              </Badge>
            )}
            {(unit.teamId === ctx.user || unit.flags.isInspected) && (
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
            )}
          </div>
        </div>
        <CardContent className="p-2 pt-0">
          <UnitBars unit={unit} isActive={isActive} hideStats={hideStats} />
        </CardContent>
      </div>
      <UnitModifiers
        unit={props.unit}
        className={cn({ 'mt-2': !reverse, 'mb-2': reverse })}
      />
    </motion.div>
  )
}
