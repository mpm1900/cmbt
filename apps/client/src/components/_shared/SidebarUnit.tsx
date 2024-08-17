import { useGame } from '@/hooks/state'
import { Unit } from '@repo/game/types'
import { applyMutations } from '@repo/game/utils'
import { BiCog } from 'react-icons/bi'
import { CgDetailsMore } from 'react-icons/cg'
import { Button } from '../ui/button'
import { EditUnitModal } from './EditUnitModal'
import { HealthBar } from './HealthBar'

export type SidebarUnitProps = {
  unit: Unit
}

export function SidebarUnit(props: SidebarUnitProps) {
  const {} = props
  const game = useGame()
  const unit = applyMutations(props.unit, props.unit.modifiers())

  return (
    <div className="flex flex-row space-x-2">
      <div className="flex-1">
        <div>{unit.name}</div>
        <HealthBar unit={unit} />
      </div>
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
          <BiCog size={28} />
        </Button>
      </EditUnitModal>

      <Button
        variant="ghost"
        className="h-full opacity-40 hover:opacity-100 p-2"
      >
        <CgDetailsMore size={28} />
      </Button>
    </div>
  )
}
