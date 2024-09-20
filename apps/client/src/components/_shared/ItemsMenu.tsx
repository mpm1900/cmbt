import { useEncounterContext } from '@/hooks'
import { groupItemsById } from '@/utils'
import { BASE_UNIT } from '@repo/game/data'
import { Item } from '@repo/game/types'
import { MenubarContent, MenubarMenu, MenubarTrigger } from '../ui/menubar'
import { ItemEquipButton } from './ItemEquipButton'
import { ItemListTable } from './ItemListTable'
import { ItemUseButton } from './ItemUseButton'

export type ItemsMenuProps = {
  items: Item[]
}

export function ItemsMenu(props: ItemsMenuProps) {
  const { items } = props
  const groupedItems = groupItemsById(items)
  const ctx = useEncounterContext()

  return (
    <MenubarMenu>
      <MenubarTrigger>Items</MenubarTrigger>
      <MenubarContent className="w-[320px]">
        <ItemListTable
          unit={BASE_UNIT}
          items={groupedItems}
          costMultiplier={1}
          quantities={Object.fromEntries(
            groupedItems.map((i) => [i.id, i.count])
          )}
          resources={{ credits: 0 }}
          action={(item) => (
            <>
              {item.action && <ItemUseButton item={item} />}
              {item.augment && <ItemEquipButton item={item} />}
            </>
          )}
        />
      </MenubarContent>
    </MenubarMenu>
  )
}
