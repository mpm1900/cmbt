import { groupItemsById } from '@/utils'
import { Item, Team } from '@repo/game/types'
import { Button } from '../ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { ItemListTable, ItemListTableProps } from './ItemListTable'

export function ItemListTables(
  props: ItemListTableProps & {
    sellTeam: Team
    onSellClick?: (i: Item) => void
  }
) {
  const { items, team, unit, costMultiplier, sellTeam, onSellClick } = props
  const consumables = items.filter((i) => !!i.action)
  const augments = items.filter((i) => !!i.augment)
  const sellItems = groupItemsById(team?.items ?? [])

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center justify-start">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="consumables">Consumables</TabsTrigger>
          <TabsTrigger value="equipables">Equipables</TabsTrigger>
          <TabsTrigger value="sell">Sell</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="all">
        <ItemListTable {...props} />
      </TabsContent>
      <TabsContent value="consumables">
        <ItemListTable {...props} items={consumables} />
      </TabsContent>
      <TabsContent value="equipables">
        <ItemListTable {...props} items={augments} />
      </TabsContent>
      <TabsContent value="sell">
        <ItemListTable
          items={sellItems}
          team={sellTeam}
          unit={unit}
          costMultiplier={1 / costMultiplier}
          action={(i) =>
            i.canSell ? (
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  if (onSellClick) {
                    onSellClick(i)
                  }
                }}
              >
                Sell
              </Button>
            ) : null
          }
        />
      </TabsContent>
    </Tabs>
  )
}
