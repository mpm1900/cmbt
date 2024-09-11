import { ChoiceAttributes } from '@/components/encounter/ChoiceAttributes'
import { Narration } from '@/components/encounter/Narration'
import { Quote } from '@/components/encounter/Quote'
import { Separator } from '@/components/ui/separator'
import { choice } from '@/worlds/_utils'
import { TeamId, Wolf } from '@repo/game/data'
import { EncounterNode, Team } from '@repo/game/types'
import { makeEnemyUnit } from '@repo/game/utils'
import { nanoid } from 'nanoid'
import { BsArrowLeft } from 'react-icons/bs'
import { GiVillage } from 'react-icons/gi'
import { IoMdReturnLeft } from 'react-icons/io'
import { LuSwords } from 'react-icons/lu'
import { CampEncounterActions } from './Actions'
import { CampEncounterStartId } from './CampEncounterStart'
import { CampEncounterTabs } from './Tabs'

export const CampEncounterCombatTraining01Id = nanoid()
export const CampEncounterCombatTraining01: EncounterNode = {
  id: CampEncounterCombatTraining01Id,
  icon: <GiVillage />,
  title: 'Friendly Village - Combat Training',
  actions: (ctx) => CampEncounterActions(ctx),
  tabs: (ctx) => CampEncounterTabs(ctx),

  render(ctx, props) {},
  choices: (ctx, props) => {
    return [
      choice({
        label: `"We'd like some combat training."`,
        to: CampEncounterCombatTrainingCombatStartId,
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

export const CampEncounterCombatTraining02Id = nanoid()
export const CampEncounterCombatTraining02: EncounterNode = {
  ...CampEncounterCombatTraining01,
  id: CampEncounterCombatTraining02Id,
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
        to: CampEncounterCombatTraining01Id,
        resolve(ctx) {
          ctx.log(
            <div className="space-y-1">
              <div>
                <Quote name="Dan">
                  "I see. I cannot help you with that. I'm sure you already
                  know, but that forest is cursed. I've seen too many go in, and
                  far fewer come out."
                </Quote>
              </div>
              <div>
                <Narration>You see pain in Dan's face.</Narration>
              </div>
              <div>
                "Though I know you will refuse, I must ask that you all turn
                back. Nothing good lives in that forest."
              </div>
            </div>
          )
        },
      }),
      ...(CampEncounterCombatTraining01.choices
        ? CampEncounterCombatTraining01.choices(ctx, props)
        : []),
    ]
  },
}

export const CampEncounterCombatTrainingCombatStartId = nanoid()
export const CampEncounterCombatTrainingCombatStart: EncounterNode = {
  id: CampEncounterCombatTrainingCombatStartId,
  icon: <GiVillage />,
  title: 'Friendly Village - Combat Training',
  actions: (ctx) => CampEncounterActions(ctx),
  tabs: (ctx) => CampEncounterTabs(ctx),

  render(ctx, props) {
    ctx.log(
      <Quote name="Dan">
        "We're always down for a battle to keep our skills sharp. Isn't that
        right Ryab?"
      </Quote>
    )
    ctx.log(<Quote name="Ryab">"Fight! Fight!"</Quote>)
  },
  choices(ctx, props) {
    return [
      choice({
        before: (
          <ChoiceAttributes>
            <LuSwords />
          </ChoiceAttributes>
        ),
        label: <>Fight!</>,
        action: true,
        resolve: (ctx) => {
          const enemyTeam: Team = {
            id: TeamId(),
            resources: { credits: 0 },
            items: [],
            maxActiveUnits: 2,
          }
          ctx.initializeCombat({
            enemyTeam,
            enemyUnits: Array.from({ length: 4 }).map((_, i) => {
              const e = makeEnemyUnit({ level: 16, teamId: enemyTeam.id }, [
                Wolf,
              ])
              e.name = 'Village Soldier'
              if (i === 0) e.name = 'Dan'
              if (i === 1) e.name = 'Ryab'
              return e
            }),
            commit: false,
            reward: {
              items: [],
              resources: {
                credits: 0,
              },
              xp: 100,
            },
            onSuccess: () => {
              ctx.gotoNode(CampEncounterCombatTrainingCombatEndId)
              ctx.nav('/encounter')
            },
            onFailure: () => {
              ctx.gotoNode(CampEncounterCombatTrainingCombatEndId)
              ctx.nav('/encounter')
            },
          })
        },
      }),
    ]
  },
}

export const CampEncounterCombatTrainingCombatEndId = nanoid()
export const CampEncounterCombatTrainingCombatEnd: EncounterNode = {
  id: CampEncounterCombatTrainingCombatEndId,
  icon: <GiVillage />,
  title: 'Friendly Village - Combat Training End',
  actions: (ctx) => CampEncounterActions(ctx),
  tabs: (ctx) => CampEncounterTabs(ctx),

  render(ctx, props) {
    ctx.log(<Separator />)
    ctx.log(
      <Narration>
        [ Your party's health and items are reset to what they were before
        combat ]
      </Narration>
    )
    ctx.log(
      <Quote name="Dan">
        "Haha! What a thrilling fight! Let me know if you all want more
        practice."
      </Quote>
    )
  },

  choices(ctx, props) {
    return [
      choice({
        label: <>Back</>,
        action: true,
        after: <BsArrowLeft />,
        to: CampEncounterStartId,
      }),
    ]
  },
}
