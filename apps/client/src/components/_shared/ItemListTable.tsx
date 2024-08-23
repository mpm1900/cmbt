import { cn } from '@/lib/utils'
import { Id, Item, TeamResources } from '@repo/game/types'
import { Button } from '../ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'

export type ItemListTableProps = {
  items: Item[]
  quantities: Record<Id, number>
  resources: TeamResources
  onClick?: (item: Item) => void
}

export function ItemListTable(props: ItemListTableProps) {
  const { items, quantities, resources, onClick } = props
  console.log(items)

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
          <TableRow key={item.id}>
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
        ))}
      </TableBody>
    </Table>
  )
}
