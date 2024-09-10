import { Narration } from '@/components/encounter/Narration'
import { Quote } from '@/components/encounter/Quote'
import { groupItemsById } from '@/utils'
import { choice } from '@/worlds/_utils'
import { Separator } from '@radix-ui/react-menubar'
import { BASE_UNIT } from '@repo/game/data'
import { EncounterNode, Item } from '@repo/game/types'
import { ItemListTables } from '@shared/ItemListTables'
import { nanoid } from 'nanoid'
import { BsArrowLeft } from 'react-icons/bs'
import { IoMdReturnLeft, IoMdReturnRight } from 'react-icons/io'
import { LiaFortAwesome } from 'react-icons/lia'
import { ChibleeId } from '.'
import { CampEncounterStartId } from './CampEncounterStart'
import { CampEncounterTabs } from './Tabs'

export const CampEncounterShopId = nanoid()
export const CampEncounterShop: EncounterNode = {
  id: CampEncounterShopId,
  icon: <LiaFortAwesome />,
  title: `Friendly Camp - Chiblee's Shop`,

  render: (ctx) => {
    ctx.log(
      <span>
        <Quote name="Chiblee">
          "We have a number of things your sort might need."
        </Quote>{' '}
        <Narration>She gestures toward the shelf behind them.</Narration>
      </span>
    )
    ctx.log(<Separator />)
  },
  actions: (ctx) => [
    choice({
      label: <IoMdReturnLeft />,
      back: true,
    }),
  ],
  tabs: (ctx) => CampEncounterTabs(ctx),
  Component: (props) => {
    const { ctx } = props
    const npc = ctx.npcs.find((c) => c.id === ChibleeId)
    const buyItem = (item: Item) => {
      if (npc) {
        ctx.updateNpcItems(ChibleeId, (items) =>
          items.filter((i) => i.rtid !== item.rtid)
        )
        const cost = Math.round(item.cost * npc.values.costMultiplier)
        ctx.buyItem(item, cost)
      }
    }

    const items = groupItemsById(npc!.items)

    return (
      <div className="space-y-4">
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
  },
  footer: (ctx) => [
    choice({
      before: <BsArrowLeft />,
      label: <>Back</>,
      to: CampEncounterStartId,
    }),
    choice({
      label: <>Leave</>,
      after: <IoMdReturnRight />,
      back: true,
    }),
  ],
}
