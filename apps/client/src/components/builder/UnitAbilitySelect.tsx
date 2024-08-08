import { Augment } from '@repo/game/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

export type UnitAbilitySelectProps = {
  options: Augment[]
  value: Augment | undefined
  onChnage: (value: Augment | undefined) => void
}

export function UnitAbilitySelect(props: UnitAbilitySelectProps) {
  const { options, value, onChnage } = props

  return (
    <Select
      value={value?.id}
      onValueChange={(id) => {
        onChnage(options.find((o) => o.id === id))
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select an Ability" />
      </SelectTrigger>
      <SelectContent>
        {options.map((ability) => (
          <SelectItem key={ability.id} value={ability.id}>
            {ability.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
