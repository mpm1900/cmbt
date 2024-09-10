import { groupItemsById } from '@/utils'
import { BASE_UNIT } from '@repo/game/data'
import { EncounterContext, Item, Npc } from '@repo/game/types'
import { ItemListTables } from '@shared/ItemListTables'

export type NpcShopProps = {
  ctx: EncounterContext
  npc: Npc
}

export function NpcShop(props: NpcShopProps) {
  const { ctx, npc } = props
  const buyItem = (item: Item) => {
    ctx.updateNpcItems(npc.id, (items) =>
      items.filter((i) => i.rtid !== item.rtid)
    )
    const cost = Math.round(item.cost * npc.values.costMultiplier)
    ctx.buyItem(item, cost)
  }
  const items = groupItemsById(npc.items)

  return (
    <div>
      {ctx.team && npc && (
        <ItemListTables
          unit={BASE_UNIT}
          items={items}
          costMultiplier={npc.values.costMultiplier}
          resources={ctx.team.resources}
          quantities={Object.fromEntries(items.map((i) => [i.id, i.count]))}
          onClick={(item) => {
            buyItem(item)
          }}
        />
      )}
    </div>
  )
}
