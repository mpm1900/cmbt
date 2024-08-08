import { ALL_BASES } from '@repo/game/data'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { UnitBase } from '@repo/game/types'

export type UnitBaseSelectProps = {
  value: UnitBase
  onChange: (base: UnitBase) => void
}

export function UnitBaseSelect(props: UnitBaseSelectProps) {
  const { value, onChange } = props

  return (
    <Select
      value={value.id}
      onValueChange={(id) =>
        onChange(ALL_BASES.find((base) => base.id === id) as UnitBase)
      }
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a base" />
      </SelectTrigger>
      <SelectContent>
        {ALL_BASES.map((base) => (
          <SelectItem key={base.id} value={base.id}>
            {base.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
