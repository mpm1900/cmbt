import { useGame } from '@/hooks/state'
import { Unit } from '@repo/game/types'
import { applyMutations } from '@repo/game/utils'
import { Button } from '../ui/button'
import { EditUnitModal } from './EditUnitModal'

export type SidebarUnitProps = {
  unit: Unit
}

export function SidebarUnit(props: SidebarUnitProps) {
  const {} = props
  const game = useGame()
  const unit = applyMutations(props.unit, props.unit.modifiers())

  return (
    <div className="flex flex-row">
      <div className="flex-1">
        <div>{unit.name}</div>
        <div>
          HP ({unit.stats.health - unit.values.damage}/{unit.stats.health})
        </div>
      </div>
      <EditUnitModal
        unit={props.unit}
        onChange={(changes) =>
          game.updateUnits((u) => (u.id === unit.id ? changes : u))
        }
      >
        <Button>Edit</Button>
      </EditUnitModal>
    </div>
  )
}
