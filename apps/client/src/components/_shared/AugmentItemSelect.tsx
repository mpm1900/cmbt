import { useGame } from '@/hooks/state'
import { Augment } from '@repo/game/types'
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
  value: Augment | undefined
  onChange: (augment: Augment | undefined) => void
}

export function AugmentItemSelect(props: AugmentItemSelectProps) {
  const { value, onChange } = props
  const game = useGame()
  const equippedAugmentIds = game.units.flatMap((u) =>
    u.augments.map((a) => a.itemRtid)
  )
  const augmentItems = game.team.items.filter((i) => !!i.augment)
  const availableItems = augmentItems.filter(
    (i) => !equippedAugmentIds.includes(i.rtid)
  )

  return (
    <Select
      key={value?.itemRtid || nanoid()}
      disabled={availableItems.length === 0 && !value}
      value={value?.itemRtid}
      onValueChange={(rtid) => {
        console.log('onchange', rtid)
        if (rtid === value?.itemRtid) {
          onChange(undefined)
        } else {
          onChange(augmentItems.find((i) => i.rtid === rtid)?.augment!)
        }
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select an item" />
      </SelectTrigger>
      <SelectContent>
        {augmentItems.map((item) => (
          <AugmentHover key={item.rtid} side="left" augment={item.augment!}>
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
