import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { TAG_ICONS } from '@/renderers/Tags'
import { getUnitModifierRenderList } from '@/utils'
import { SwitchUnitId } from '@repo/game/data'
import { ActionResult, Id, TurnStatus, Unit } from '@repo/game/types'
import { applyModifiers } from '@repo/game/utils'
import { MagicArmor } from '@shared/MagicArmor'
import { PhysicalArmor } from '@shared/PhysicalArmor'
import { motion } from 'framer-motion'
import { CgDetailsMore } from 'react-icons/cg'
import { useCombatContext } from '../../../hooks'
import { useActions, useCombat, useCombatUi } from '../../../hooks/state'
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

type GetUnitCardStateConfig = {
  unitId: Id
  activeUnitId: Id | undefined
  status: TurnStatus
  hoverIds: Id[]
  result: ActionResult | undefined
}
function getUnitCardState(config: GetUnitCardStateConfig) {
  const action = config.result?.action
  const targets =
    ((config.result?.expandedTargets ?? []).length === 0
      ? config.result?.targets
      : config.result?.expandedTargets) ?? []
  const isMain = config.status === 'main'
  const isCombat = config.status === 'combat'
  const isSource = action?.sourceId === config.unitId
  const isActiveUnit = isMain && config.activeUnitId === config.unitId
  const isTarget = targets.some((t) => t.id === config.unitId)
  const isTargeted =
    config.hoverIds.includes(config.unitId) || (isCombat && isTarget)
  const isTargetedSwitch = isTargeted && action?.id === SwitchUnitId
  const isActive = isCombat ? isSource || isTargetedSwitch : isActiveUnit

  return {
    isActive,
    isTargeted,
  }
}

export function UnitCard(props: UnitCardProps) {
  const { reverse, isEnemy } = props
  const ctx = useCombatContext()
  const combat = useCombat()
  const status = combat.turn.status
  const result = combat.turn.results[combat.turn.results.length - 1]
  const { queue } = useActions()
  const { activeUnit, setActiveUnit, hoverTargetUnitIds } = useCombatUi()
  const { unit } = applyModifiers(props.unit, ctx)
  const modifiers = getUnitModifierRenderList(props.unit, ctx)
  const stagedItem = queue.find((i) => i.action.sourceId === unit.id)
  const isSelectable = status === 'main' && !unit.flags.isStunned && !stagedItem
  const { isActive, isTargeted } = getUnitCardState({
    unitId: unit.id,
    activeUnitId: activeUnit?.id,
    status: status,
    hoverIds: hoverTargetUnitIds ?? [],
    result,
  })

  if (unit.name === 'Antonette') {
    console.log(unit, combat.stagedActions)
  }
  return (
    <motion.div
      layout
      className={cn('flex flex-1 flex-col', {
        'flex-col-reverse': reverse,
        'opacity-40':
          unit.flags.isProtected &&
          unit.flags.isHidden &&
          combat.stagedActions[unit.id],
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
        <div className="space-x-2 p-2 pb-1 flex flex-row items-center justify-between">
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
          <div className="flex flex-1 justify-start">
            {unit.tags.map((tag, i) => {
              const icon = TAG_ICONS[tag.id]
              return (
                icon && (
                  <Tooltip key={i} delayDuration={200}>
                    <TooltipTrigger>
                      <div className="opacity-20 h-[24px]">{icon}</div>
                    </TooltipTrigger>
                    <TooltipContent>{tag.label}</TooltipContent>
                  </Tooltip>
                )
              )
            })}
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
                    original={props.unit}
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
        className={cn({ 'mt-0.5': !reverse, 'mb-0.5': reverse })}
      />
    </motion.div>
  )
}
