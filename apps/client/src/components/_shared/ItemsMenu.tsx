import { useEncounterContext } from '@/hooks'
import { groupItemsById } from '@/utils'
import { BASE_UNIT } from '@repo/game/data'
import { Item } from '@repo/game/types'
import { Button } from '../ui/button'
import { MenubarContent, MenubarMenu, MenubarTrigger } from '../ui/menubar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { TableCell } from '../ui/table'
import { ItemListTable } from './ItemListTable'

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
            <TableCell>
              {item.action && (
                <Popover>
                  <PopoverTrigger>
                    <Button size="sm" variant="ghost">
                      Use
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="grid grid-cols-2 gap-2">
                      {ctx.units.map((unit) => (
                        <Button variant="outline">{unit.name}</Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              )}
              {item.augment && <Button size="sm">equip</Button>}
            </TableCell>
          )}
        />
      </MenubarContent>
    </MenubarMenu>
  )
}
