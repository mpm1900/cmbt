import { groupItemsById } from '@/utils'
import { BASE_UNIT } from '@repo/game/data'
import { EncounterContext, Item, Npc } from '@repo/game/types'
import { ItemListTables } from '@shared/ItemListTables'
import { nanoid } from 'nanoid'

export type NpcShopProps = {
  ctx: EncounterContext
  npc: Npc
}

export function NpcShop(props: NpcShopProps) {
  const { ctx, npc } = props
  function buyItem(item: Item) {
    ctx.updateNpcItems(npc.id, (items) =>
      items.filter((i) => i.rtid !== item.rtid)
    )
    const cost = Math.round(item.cost * npc.values.costMultiplier)
    ctx.buyItem(item, cost)
  }
  function sellItem(item: Item) {
    ctx.updateNpcItems(npc.id, (items) => [...items, item])
    const cost = Math.round(item.cost * (1 / npc.values.costMultiplier))
    ctx.updateTeam((team) => ({
      resources: { ...team.resources, credits: team.resources.credits + cost },
      items: team.items.filter((i) => i.rtid !== item.rtid),
    }))
  }

  const items = groupItemsById(npc.items)

  return (
    <div>
      {ctx.team && npc && (
        <ItemListTables
          unit={BASE_UNIT}
          items={items}
          costMultiplier={npc.values.costMultiplier}
          team={ctx.team}
          onClick={(item) => {
            buyItem(item)
          }}
          onSellClick={(item) => {
            sellItem(item)
          }}
          sellTeam={{
            id: nanoid(),
            items: [],
            resources: npc.resources,
            maxActiveUnits: 0,
          }}
        />
      )}
    </div>
  )
}
