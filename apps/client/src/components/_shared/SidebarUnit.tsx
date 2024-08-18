import { useGame } from '@/hooks/state'
import { Unit } from '@repo/game/types'
import { applyMutations } from '@repo/game/utils'
import { CgDetailsMore } from 'react-icons/cg'
import { Button } from '../ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { EditUnitModal } from './EditUnitModal'
import { UnitBars } from './UnitBars'
import { UnitStats } from './UnitStats'

export type SidebarUnitProps = {
  unit: Unit
}

export function SidebarUnit(props: SidebarUnitProps) {
  const game = useGame()
  const unit = applyMutations(props.unit, props.unit.modifiers())

  return (
    <div className="rounded hover:bg-slate-800 flex flex-row space-x-2 items-center">
      <HoverCard openDelay={300} closeDelay={0}>
        <HoverCardTrigger asChild>
          <div className="p-4 pr-0 flex-1">
            <div className="flex-1 space-y-2">
              <div>{unit.name}</div>
              <UnitBars
                unit={unit}
                isActive={false}
                hideStats={false}
                initial={100}
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
          <UnitStats unit={props.unit} />
        </HoverCardContent>
      </HoverCard>
      <div className="p-2">
        <EditUnitModal
          unit={props.unit}
          onChange={(changes) =>
            game.updateUnits((u) => (u.id === unit.id ? changes : u))
          }
        >
          <Button
            variant="ghost"
            className="h-full opacity-40 hover:opacity-100 p-2"
          >
            <CgDetailsMore size={28} />
          </Button>
        </EditUnitModal>
      </div>
    </div>
  )
}
