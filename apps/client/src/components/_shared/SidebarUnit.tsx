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
import { Button } from '../ui/button'
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
      <Button variant="ghost" className="w-full h-full p-0">
        <HoverCard openDelay={300} closeDelay={100}>
          <HoverCardTrigger asChild>
            <div className="flex-1 p-4">
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="space-x-2">
                    <span className="font-black">
                      <span className="text-sm text-muted-foreground font-thin">
                        Lv.
                      </span>
                      {unit.level}
                    </span>
                    <span>{unit.name}</span>
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {base?.name}
                  </span>
                </div>

                <HealthBar unit={unit} initial={ratio} />
                <UnitModifiers
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
            sideOffset={16}
          >
            <UnitStats unit={unit} comp={props.unit} />
          </HoverCardContent>
        </HoverCard>
      </Button>
    </EditUnitModal>
  )
}
