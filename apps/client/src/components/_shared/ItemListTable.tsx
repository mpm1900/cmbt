import { cn } from '@/lib/utils'
import { ItemRarityRenderers } from '@/renderers/ItemRarity'
import { GroupedItem, Id, Item, TeamResources, Unit } from '@repo/game/types'
import { ReactNode } from 'react'
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
  costMultiplier: number
  quantities: Record<Id, number>
  resources: TeamResources
  action?: (item: Item) => ReactNode
  onClick?: (item: Item) => void
}

export function ItemListTable(props: ItemListTableProps) {
  const {
    unit,
    items,
    costMultiplier,
    quantities,
    resources,
    onClick,
    action,
  } = props

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>name</TableHead>
            <TableHead>{onClick ? 'cost' : 'value'}</TableHead>
            <TableHead>#</TableHead>
            {onClick && (
              <TableHead className="flex justify-end items-center"></TableHead>
            )}
            {action && <TableHead></TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((item) => {
              const cost = Math.round(item.cost * costMultiplier)
              return (
                <ItemHover key={item.rtid} item={item} unit={unit} side="right">
                  <TableRow>
                    <TableCell
                      className={cn('w-full')}
                      style={{ color: ItemRarityRenderers[item.rarity].color }}
                    >
                      {item.name}
                    </TableCell>

                    <TableCell
                      className={cn('', {
                        'text-red-400':
                          !!onClick && (resources.credits ?? 0) < cost,
                      })}
                    >
                      <div className="flex items-center">
                        <span>{cost}</span>
                        <GiCreditsCurrency />
                      </div>
                    </TableCell>

                    <TableCell
                      width={32}
                      className={cn('num', {
                        'text-red-400': quantities[item.id] <= 0,
                      })}
                    >
                      x{quantities[item.id]}
                    </TableCell>
                    {onClick && (
                      <TableCell className="p-0">
                        <Button
                          disabled={
                            (resources.credits ?? 0) < cost ||
                            quantities[item.id] <= 0
                          }
                          variant="ghost"
                          className={cn({
                            'text-red-400':
                              (resources.credits ?? 0) < cost ||
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
                    {action && <TableCell>{action(item)}</TableCell>}
                  </TableRow>
                </ItemHover>
              )
            })}
        </TableBody>
      </Table>
      {items.length === 0 && (
        <div className="w-full p-2 text-center text-muted">
          No items available
        </div>
      )}
    </div>
  )
}
