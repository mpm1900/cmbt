import { Unit } from '@repo/game/types'
import { applyMutations } from '@repo/game/utils'

export type SidebarUnitProps = {
  unit: Unit
}

export function SidebarUnit(props: SidebarUnitProps) {
  const {} = props
  const unit = applyMutations(props.unit, props.unit.modifiers())

  return (
    <div>
      <div>{unit.name}</div>
      <div>
        HP ({unit.stats.health - unit.values.damage}/{unit.stats.health})
      </div>
    </div>
  )
}
