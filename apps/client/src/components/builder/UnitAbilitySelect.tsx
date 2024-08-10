import { Augment } from '@repo/game/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { AugmentRenderers } from '@/renderers'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { HoverCardPortal } from '@radix-ui/react-hover-card'

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
          <HoverCard key={ability.id} openDelay={0} closeDelay={0}>
            <HoverCardTrigger asChild>
              <SelectItem value={ability.id}>{ability.name}</SelectItem>
            </HoverCardTrigger>
            <HoverCardPortal>
              <HoverCardContent side="left">
                <div className="text-muted-foreground">
                  {renderer?.description()}
                </div>
              </HoverCardContent>
            </HoverCardPortal>
          </HoverCard>
        ))}
      </SelectContent>
    </Select>
  )
}
