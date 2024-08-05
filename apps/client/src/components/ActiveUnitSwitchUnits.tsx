import { SwitchUnit } from '@repo/game/data'
import { SwitchUnits } from './SwitchUnits'
import { Unit } from '@repo/game/types'
import { useState } from 'react'
import { MAX_ACTIVE_UNITS_COUNT } from '@/constants'

export type ActiveUnitSwitchUnitsProps = {
  unit: Unit
  onConfirm: (targets: Unit[]) => void
}

export function ActiveUnitSwitchUnits(props: ActiveUnitSwitchUnitsProps) {
  const { unit, onConfirm } = props
  const [selectedTargets, setSelectedTargets] = useState<Unit[]>([])
  const action = new SwitchUnit(unit.id, unit.teamId)
  return (
    <SwitchUnits
      selectedTargets={selectedTargets}
      action={action}
      onClick={(target) => {
        if (selectedTargets.find((u) => u.id === target.id)) {
          setSelectedTargets((t) => t.filter((u) => u.id !== target.id))
        } else {
          if (selectedTargets.length < action.maxTargetCount) {
            setSelectedTargets((t) => [...t, target])
          }
        }
      }}
      onConfirm={() => onConfirm(selectedTargets)}
    />
  )
}
