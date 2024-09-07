import { useCombatContext } from '@/hooks'
import { useGame } from '@/hooks/state'
import { getStatusesFromModifiers } from '@/utils/getStatusesFromModifiers'
import { Trigger, Unit } from '@repo/game/types'
import {
  applyMutations,
  getModifiersFromUnit,
  getUnitBase,
  validateModifiers,
} from '@repo/game/utils'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { EditUnitModal } from './EditUnitModal'
import { HealthBar } from './HealthBar'
import { UnitModifiers } from './UnitModifiers'
import { UnitStats } from './UnitStats'

export type SidebarUnitProps = {
  unit: Unit
}

export function SidebarUnit(props: SidebarUnitProps) {
  const game = useGame()
  const ctx = useCombatContext()
  const { base } = getUnitBase(props.unit.baseId)
  const mock: Unit = {
    ...props.unit,
    flags: { ...props.unit.flags, isActive: true },
  }
  const unit = applyMutations(
    props.unit,
    validateModifiers(
      getModifiersFromUnit(mock).filter(
        (m) => !(m instanceof Trigger) && m.filter(mock, ctx, {})
      ),
      []
    )
  )
  const remainingHealth = Math.max(unit.stats.health - unit.values.damage, 0)
  const ratio = (remainingHealth / unit.stats.health) * 100

  const mods = getModifiersFromUnit(unit)
  const nonStatusModifiers = mods.filter((m) => !m.statusId)
  const statuses = getStatusesFromModifiers(mods)
  return (
    <EditUnitModal
      unit={props.unit}
      onChange={(changes) =>
        game.updateUnits((u) => (u.id === unit.id ? changes : u))
      }
    >
      <div className="w-full h-full p-0 hover:bg-muted cursor-pointer">
        <HoverCard openDelay={300} closeDelay={100}>
          <HoverCardTrigger asChild>
            <div className="flex flex-1 items-center p-3">
              <div className="flex-1 p-0">
                <div className="flex justify-between items-center space-x-4 mb-1">
                  <div className="flex space-x-2">
                    <span>
                      <span className="text-sm text-muted-foreground font-thin">
                        Lv.
                      </span>
                      <span className="font-black">{unit.level}</span>
                    </span>
                    <div className="font-bold">{unit.name}</div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {base?.name}
                  </span>
                </div>

                <HealthBar unit={unit} initial={ratio} className="h-[6px]" />
                <UnitModifiers
                  className="px-0"
                  iconClassName="h-[20px] w-[20px] mt-2"
                  modifiers={nonStatusModifiers}
                  statuses={statuses}
                />
              </div>
            </div>
          </HoverCardTrigger>
          <HoverCardContent
            side="left"
            className="w-full"
            collisionPadding={32}
            sideOffset={8}
          >
            <UnitStats unit={unit} comp={props.unit} />
          </HoverCardContent>
        </HoverCard>
      </div>
    </EditUnitModal>
  )
}
