import { Item } from '@repo/game/types'
import { Button } from '../ui/button'

export type ItemEquipButtonProps = {
  item: Item
}

export function ItemEquipButton(props: ItemEquipButtonProps) {
  return (
    <Button size="sm" variant="ghost">
      Equip
    </Button>
  )
}
