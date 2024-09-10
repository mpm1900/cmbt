import { Narration } from '@/components/encounter/Narration'
import { NpcShop } from '@/components/encounter/NpcShop'
import { Quote } from '@/components/encounter/Quote'
import { choice } from '@/worlds/_utils'
import { Separator } from '@radix-ui/react-menubar'
import { EncounterNode } from '@repo/game/types'
import { nanoid } from 'nanoid'
import { BsArrowLeft } from 'react-icons/bs'
import { IoMdReturnRight } from 'react-icons/io'
import { LiaFortAwesome } from 'react-icons/lia'
import { ChibleeId } from '../../npcs/Chiblee'
import { CampEncounterActions } from './Actions'
import { CampEncounterStartId } from './CampEncounterStart'
import { CampEncounterTabs } from './Tabs'

export const CampEncounterShopId = nanoid()
export const CampEncounterShop: EncounterNode = {
  id: CampEncounterShopId,
  icon: <LiaFortAwesome />,
  title: `Friendly Camp - Chiblee's Shop`,
  actions: (ctx) => CampEncounterActions(ctx),
  tabs: (ctx) => CampEncounterTabs(ctx),

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
  Component: (props) => {
    const { ctx } = props
    const npc = ctx.npcs.find((c) => c.id === ChibleeId)
    return <NpcShop ctx={ctx} npc={npc!} />
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
