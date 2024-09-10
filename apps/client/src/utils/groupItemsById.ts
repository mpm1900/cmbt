import { GroupedItem, Item } from '@repo/game/types'

export function groupItemsById(items: Item[]): GroupedItem[] {
  return items.reduce<GroupedItem[]>((prev, item) => {
    if (prev.find((i) => i.id === item.id)) {
      return prev.map((i) =>
        i.id === item.id ? { ...i, count: i.count + 1 } : i
      )
    }
    return [
      ...prev,
      {
        ...item,
        count: 1,
      },
    ]
  }, [])
}
