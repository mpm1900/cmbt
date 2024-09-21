import { Narration } from '@/components/encounter/Narration'
import { choice } from '@/worlds/_utils'
import { Separator } from '@radix-ui/react-menubar'
import { EncounterNode } from '@repo/game/types'
import { nanoid } from 'nanoid'
import { GiVillage } from 'react-icons/gi'
import { IoMdReturnRight } from 'react-icons/io'
import { CampEncounterActions } from './Actions'
import { CampEncounterCombatTraining02Id } from './CampEncounterCombatTraining'
import { CampEncounterInnId } from './CampEncounterInn'
import { CampEncounterTabs } from './Tabs'

export const CampEncounterStartId = nanoid()
export const CampEncounterStart: EncounterNode = {
  id: CampEncounterStartId,
  icon: <GiVillage />,
  title: 'Friendly Village',
  actions: (ctx) => CampEncounterActions(ctx),
  tabs: (ctx) => CampEncounterTabs(ctx),

  render(ctx, props) {
    ctx.log(
      <div className="space-y-4">
        <Narration>Where would you like to go?</Narration>
      </div>
    )

    ctx.log(<Separator />)
  },

  choices() {
    return [
      choice({
        label: 'Go to combat training',
        to: CampEncounterCombatTraining02Id,
        action: true,
      }),
      choice({
        label: 'Go to the Inn',
        to: CampEncounterInnId,
        action: true,
      }),
      choice({
        label: <>Leave</>,
        after: <IoMdReturnRight />,
        back: true,
      }),
    ]
  },
}
