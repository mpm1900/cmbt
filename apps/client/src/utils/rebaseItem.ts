import { Item } from '@repo/game/types'
import { nanoid } from 'nanoid/non-secure'

export function rebaseItem(item: Item): Item {
  const rtid = nanoid()
  let value = { ...item, rtid }
  if (value.augment) {
    value.augment = {
      ...value.augment,
      itemRtid: rtid,
    }
  }

  return value
}
