import { Item } from '@repo/game/types'
import { nanoid } from 'nanoid'

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
