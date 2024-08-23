import { cn } from '@/lib/utils'
import { GroupedItem, Id, Item, TeamResources, Unit } from '@repo/game/types'
import { Button } from '../ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { ItemHover } from './ItemHover'

export type ItemListTableProps = {
  unit: Unit
  items: GroupedItem[]
  quantities: Record<Id, number>
  resources: TeamResources
  onClick?: (item: Item) => void
}

export function ItemListTable(props: ItemListTableProps) {
  const { unit, items, quantities, resources, onClick } = props

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>name</TableHead>
          {onClick && (
            <TableHead className="flex justify-end items-center">
              cost
            </TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <ItemHover key={item.id} item={item} unit={unit} side="right">
            <TableRow>
              <TableCell
                width={32}
                className={cn({
                  'text-red-400': quantities[item.id] <= 0,
                })}
              >
                x{quantities[item.id]}
              </TableCell>
              <TableCell>{item.name}</TableCell>
              {onClick && (
                <TableCell className="flex justify-end items-center p-0">
                  <Button
                    disabled={
                      (resources.credits ?? 0) < item.cost ||
                      quantities[item.id] <= 0
                    }
                    variant="ghost"
                    className={cn({
                      'text-red-400':
                        (resources.credits ?? 0) < item.cost ||
                        quantities[item.id] <= 0,
                    })}
                    onClick={() => {
                      onClick(item)
                    }}
                  >
                    Buy {item.cost}g
                  </Button>
                </TableCell>
              )}
            </TableRow>
          </ItemHover>
        ))}
      </TableBody>
    </Table>
  )
}
