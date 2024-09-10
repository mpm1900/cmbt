import { useCombatContext } from '@/hooks'
import { useGame } from '@/hooks/state'
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
import { UnitDetails } from './UnitDetails'
import { XpBar } from './XpBar'

export type SidebarUnitProps = {
  unit: Unit
}

export function MenuUnit(props: SidebarUnitProps) {
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
              <div className="flex-1 p-0 space-y-1">
                <div className="flex justify-between items-center space-x-4">
                  <div className="flex space-x-2">
                    <div className="font-bold">{unit.name}</div>
                  </div>
                  <div className="space-x-1 text-xs">
                    <span>
                      <span className="text-muted-foreground font-thin">
                        Lv.
                      </span>
                      <span className="font-black">{unit.level}</span>
                    </span>
                    <span className="text-muted-foreground">{base?.name}</span>
                  </div>
                </div>

                <HealthBar unit={unit} initial={ratio} className="h-[6px]" />
                <XpBar unit={unit} className="h-[4px]" />
              </div>
            </div>
          </HoverCardTrigger>
          <HoverCardContent
            side="left"
            className="w-full"
            collisionPadding={32}
            sideOffset={8}
          >
            <UnitDetails unit={unit} original={props.unit} />
          </HoverCardContent>
        </HoverCard>
      </div>
    </EditUnitModal>
  )
}
