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
import { UnitBars } from '../../_shared/UnitBars'
import { UnitCombatModifiers } from '../../_shared/UnitCombatModifiers'
import { UnitDetails } from '../../_shared/UnitDetails'
import { Button } from '../../ui/button'
import { CardContent } from '../../ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover'

export type UnitCardProps = {
  unit: Unit
  isEnemy: boolean
  reverse?: boolean
}

export function UnitCard(props: UnitCardProps) {
  const { reverse, isEnemy } = props
  const ctx = useCombatContext()
  const status = ctx.turn.status
  const result = ctx.turn.results[ctx.turn.results.length - 1]
  const { queue } = useActions()
  const { activeUnit, setActiveUnit, hoverTargetUnit } = useCombatUi()
  const { unit, appliedModifiers, registeredTriggers } = applyModifiers(
    props.unit,
    ctx
  )
  const modifiers = [...appliedModifiers, ...registeredTriggers]
  const stagedItem = queue.find((i) => i.action.sourceId === unit.id)

  const isTargeted =
    hoverTargetUnit?.id === unit.id ||
    (status === 'combat' &&
      !!result?.expandedTargets?.find((t) => t.id === unit.id))

  const isActive =
    (status === 'combat'
      ? result?.action?.sourceId === unit.id
      : status === 'main' && activeUnit?.id === unit.id) ||
    (isTargeted && result?.action?.id === SwitchUnitId)

  const isSelectable = status === 'main' && !unit.flags.isStunned && !stagedItem

  return (
    <motion.div
      layout
      className={cn('flex flex-1 flex-col', {
        'flex-col-reverse': reverse,
      })}
    >
      <div
        className={cn(
          'rounded transition-colors ease-in-out bg-slate-950 border max-h-[62px]',
          {
            'hover:bg-slate-900': isSelectable,
            'bg-slate-200 hover:bg-slate-200': isActive,
            'bg-red-500/40': isTargeted && !isActive,
            'cursor-pointer': isSelectable,
            'max-h-[62px]': isEnemy,
            'max-h-[68px]': !isEnemy,
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
            className={cn('font-semibold space-x-2', {
              'text-slate-900': isActive,
            })}
          >
            <span>
              <span className="text-sm text-muted-foreground font-thin">
                Lv.
              </span>
              <span className="font-black text-lg">{unit.level}</span>
            </span>
            <span>
              {unit.name}
              {stagedItem && '*'}
            </span>
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
                <PopoverContent
                  sideOffset={12}
                  className="w-full text-center"
                  onOpenAutoFocus={(e) => e.preventDefault()}
                >
                  <UnitDetails
                    unit={unit}
                    comp={props.unit}
                    modifiers={modifiers}
                  />
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
        <CardContent className="p-2 pt-0">
          <UnitBars unit={unit} isActive={isActive} hideStats={isEnemy} />
        </CardContent>
      </div>
      <UnitCombatModifiers
        unit={props.unit}
        side={reverse ? 'top' : 'bottom'}
        className={cn({ 'mt-2': !reverse, 'mb-2': reverse })}
      />
    </motion.div>
  )
}
