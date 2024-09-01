import { cn } from '@/lib/utils'
import { GroupedItem, Id, Item, TeamResources, Unit } from '@repo/game/types'
import { GiCreditsCurrency } from 'react-icons/gi'
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
          {onClick && <TableHead className="w-[48px] text-end">cost</TableHead>}
          {onClick && (
            <TableHead className="w-[32px] flex justify-end items-center"></TableHead>
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
              <TableCell className={cn('w-full')}>{item.name}</TableCell>
              {onClick && (
                <TableCell
                  className={cn('flex items-center justify-end', {
                    'text-red-400': (resources.credits ?? 0) < item.cost,
                  })}
                >
                  <span>{item.cost}</span>
                  <GiCreditsCurrency />
                </TableCell>
              )}
              {onClick && (
                <TableCell className="p-0">
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
                    Buy
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
