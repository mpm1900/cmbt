import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { ItemListTable, ItemListTableProps } from './ItemListTable'

export function ItemListTables(props: ItemListTableProps) {
  const { items } = props
  const consumables = items.filter((i) => !!i.action)
  const augments = items.filter((i) => !!i.augment)

  return (
    <Tabs defaultValue="all">
      <div className="flex justify-start">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="consumables">Consumables</TabsTrigger>
          <TabsTrigger value="equipables">Equipables</TabsTrigger>
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
    </Tabs>
  )
}
