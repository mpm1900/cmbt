import { AugmentRenderers } from '@/renderers'
import { Augment } from '@repo/game/types'
import { AugmentHover } from '@shared/AugmentHover'
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
  const renderer = AugmentRenderers[value?.id ?? '']

  return (
    <Select
      disabled={options.length === 0}
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
          <AugmentHover augment={ability} key={ability.id}>
            <SelectItem value={ability.id}>{ability.name}</SelectItem>
          </AugmentHover>
        ))}
      </SelectContent>
    </Select>
  )
}
