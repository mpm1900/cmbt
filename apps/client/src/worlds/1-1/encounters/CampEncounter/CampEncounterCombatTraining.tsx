import { Narration } from '@/components/encounter/Narration'
import { Quote } from '@/components/encounter/Quote'
import { choice } from '@/worlds/_utils'
import { EncounterNode } from '@repo/game/types'
import { nanoid } from 'nanoid'
import { GiVillage } from 'react-icons/gi'
import { IoMdReturnLeft } from 'react-icons/io'
import { CampEncounterActions } from './Actions'
import { CampEncounterTabs } from './Tabs'

export const CampEncounterCombatTrainingId = nanoid()
export const CampEncounterCombatTraining: EncounterNode = {
  id: CampEncounterCombatTrainingId,
  icon: <GiVillage />,
  title: 'Friendly Village - Combat Training',
  actions: (ctx) => CampEncounterActions(ctx),
  tabs: (ctx) => CampEncounterTabs(ctx),

  render: (ctx, props) => {
    ctx.log(
      <Narration>
        You walk over to the soldiers practicing their attacks. One man is a
        mage, and the other is a much larger warrior.
      </Narration>
    )
    if (props.nodeVisitCount === 1) {
      ctx.log(
        <div>
          <span>
            "Hello there travellers. I seems you're quite familiar with the art
            of battle aren't you?"
          </span>{' '}
          <Narration>
            The mage approaches your party and looks you up and down.
          </Narration>
        </div>
      )
      ctx.log(
        <Quote name="Dan">
          "I'm Dan. I'm responsible for keeping the horrors of the forest out of
          this peaceful village, and this is my brother, Ryab."
        </Quote>
      )
      ctx.log(
        <div>
          <Quote name="Ryab">"Hello."</Quote>{' '}
          <Narration>The imposing man jovially waves at you.</Narration>
        </div>
      )
      ctx.log(
        <Quote name="Dan">
          "It's not often we get newcomers to the village. What brings you here?
        </Quote>
      )
    } else {
      ctx.log(
        <div>
          <Quote name="Ryab">"Hello."</Quote>{' '}
          <Narration>The imposing man jovially waves at you.</Narration>
        </div>
      )
      ctx.log(
        <Quote name="Dan">
          "Hello again travellers. What brings you here?"
        </Quote>
      )
    }
  },
  choices: (ctx, props) => {
    return [
      choice({
        label: `"We journey to see what lies in the center of the forest."`,
      }),
      choice({
        label: `"We'd like some combat training."`,
      }),
      choice({
        label: <>Leave</>,
        action: true,
        after: <IoMdReturnLeft />,
        back: true,
      }),
    ]
  },
}
