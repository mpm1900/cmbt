import { cn } from '@/lib/utils'
import { SwitchUnitId } from '@repo/game/data'
import { Unit } from '@repo/game/types'
import { applyModifiers } from '@repo/game/utils'
import { MagicArmor } from '@shared/MagicArmor'
import { PhysicalArmor } from '@shared/PhysicalArmor'
import { motion } from 'framer-motion'
import { CgDetailsMore } from 'react-icons/cg'
import { useCombatContext } from '../../../hooks'
import { useActions, useCombatUi } from '../../../hooks/state'
import { UnitStats } from '../../_shared/UnitStats'
import { Button } from '../../ui/button'
import { CardContent } from '../../ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover'
import { UnitBars } from './UnitBars'
import { UnitModifiers } from './UnitModifiers'

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
              <PhysicalArmor>{unit.values.physicalArmor}</PhysicalArmor>
            )}
            {unit.values.magicArmor > 0 && (
              <MagicArmor>{unit.values.magicArmor}</MagicArmor>
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
                    <CgDetailsMore />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full text-center">
                  <UnitStats unit={props.unit} />
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
        side={reverse ? 'top' : 'bottom'}
        className={cn({ 'mt-2': !reverse, 'mb-2': reverse })}
      />
    </motion.div>
  )
}
