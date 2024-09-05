import { useGame } from '@/hooks/state'
import { Augment, Unit } from '@repo/game/types'
import { nanoid } from 'nanoid/non-secure'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { AugmentHover } from './AugmentHover'

export type AugmentItemSelectProps = {
  unit: Unit
  value: Augment | undefined
  onChange: (augment: Augment | undefined) => void
}

export function AugmentItemSelect(props: AugmentItemSelectProps) {
  const { value, unit, onChange } = props
  const game = useGame()
  const equippedAugmentIds = game.units.flatMap((u) =>
    u.augments.map((a) => a.itemRtid)
  )
  const augmentItems = game.team.items.filter(
    (i) =>
      !!i.augment &&
      (!i.augment.unitBaseIds || i.augment.unitBaseIds.includes(unit.baseId))
  )
  const availableItems = augmentItems.filter(
    (i) => !equippedAugmentIds.includes(i.rtid)
  )
  const disabled = availableItems.length === 0 && !value

  return (
    <Select
      key={value?.itemRtid || nanoid()}
      disabled={disabled}
      value={value?.itemRtid}
      onValueChange={(rtid) => {
        if (rtid === value?.itemRtid) {
          onChange(undefined)
        } else {
          onChange(augmentItems.find((i) => i.rtid === rtid)?.augment!)
        }
      }}
    >
      <AugmentHover side="left" augment={value}>
        <SelectTrigger>
          {!disabled && <SelectValue placeholder="Select an item" />}
          {disabled && <SelectValue placeholder="No available items" />}
        </SelectTrigger>
      </AugmentHover>
      <SelectContent>
        {augmentItems.map((item) => (
          <AugmentHover key={item.rtid} side="left" augment={item.augment}>
            <SelectItem
              disabled={
                equippedAugmentIds.includes(item.rtid) &&
                item.rtid !== value?.itemRtid
              }
              value={item.rtid!}
            >
              {item.name}
            </SelectItem>
          </AugmentHover>
        ))}
      </SelectContent>
    </Select>
  )
}
