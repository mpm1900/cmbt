import { ChoiceAttributes } from '@/components/encounter/ChoiceAttributes'
import { Narration } from '@/components/encounter/Narration'
import { Quote } from '@/components/encounter/Quote'
import { check, choice } from '@/worlds/_utils'
import { Separator } from '@radix-ui/react-menubar'
import { Celebi, TeamId } from '@repo/game/data'
import { EncounterChoice, EncounterNode, Team } from '@repo/game/types'
import { makeEnemyUnit } from '@repo/game/utils'
import { nanoid } from 'nanoid'
import { GiCreditsCurrency } from 'react-icons/gi'
import { IoMdReturnLeft } from 'react-icons/io'
import { LiaFortAwesome } from 'react-icons/lia'
import { LuSwords } from 'react-icons/lu'
import { SlSpeech } from 'react-icons/sl'
import { ChibleeId, ChibleeValues } from '../../npcs/Chiblee'
import { CampEncounterActions } from './Actions'
import { CampEncounterShopId } from './CampEncounterShop'
import { CampEncounterTabs } from './Tabs'

const enemyTeam: Team = {
  id: TeamId(),
  resources: { credits: 0 },
  items: [],
  maxActiveUnits: 2,
}

export const CampEncounterStartId = nanoid()
export const CampEncounterStart: EncounterNode = {
  id: CampEncounterStartId,
  icon: <LiaFortAwesome />,
  title: 'Friendly Camp',
  actions: (ctx) => CampEncounterActions(ctx),
  tabs: (ctx) => CampEncounterTabs(ctx),

  render: (ctx, props) => {
    const npc = ctx.npcs.find((c) => c.id === ChibleeId)

    if (props.nodeVisitCount === 0) {
      if (props.encounterVisitCount === 1) {
        ctx.log(
          <div className="space-y-4">
            <div>
              <span>
                "Allied adventurers are few and far between out here."{' '}
              </span>
              <Narration>
                Says the woman sitting near the fire in front of you.
              </Narration>
            </div>
            <div>
              <Quote name={npc!.name}>
                "It's refreshing to see a frindly face. I'm {npc!.name}. And
                over there are Ryab and Dan."
              </Quote>
            </div>
            <Narration>
              You see two similarly looking men in the distance practicing their
              sword skills.
            </Narration>
          </div>
        )
      } else {
        ctx.log(<Quote name={npc!.name}>"What can I do for you?"</Quote>)
      }
      ctx.log(<Separator />)
    }
  },
  choices: (ctx) => {
    const npc = ctx.npcs.find((c) => c.id === ChibleeId)
    const charmAttempts = npc?.values.charmAttempts
    const choices: (EncounterChoice | undefined)[] = [
      choice({
        before: (
          <ChoiceAttributes>
            <GiCreditsCurrency />
          </ChoiceAttributes>
        ),
        label: 'View wares',
        to: CampEncounterShopId,
        action: true,
      }),
      check({
        filter: charmAttempts === 0 && !!npc,
        chance: 50,
        icon: <SlSpeech />,
        label: <>Atempt to charm {npc!.name}</>,
        onSettled: (ctx) => {
          ctx.updateNpcValue<keyof ChibleeValues>(
            npc!.id,
            'charmAttempts',
            (v) => v! + 1
          )
          ctx.log(<Separator />)
        },
        onSuccess: (ctx) => {
          ctx.updateNpcValue<keyof ChibleeValues>(
            npc!.id,
            'costMultiplier',
            (v) => v! * (1 - 0.1)
          )
          ctx.log(
            <Quote name={npc!.name}>
              "Oh you're too kind. I'm flattered. Just for that, I'll give you
              10% off my prices."
            </Quote>
          )
        },
        onFailure: (ctx) => {
          ctx.log(
            <Quote name={npc!.name}>"Your charms won't work on me!"</Quote>
          )
        },
      }),
      choice({
        before: (
          <ChoiceAttributes>
            <LuSwords />
          </ChoiceAttributes>
        ),
        label: <>Attack {npc!.name}</>,
        action: true,
        resolve: (ctx) => {
          ctx.initializeCombat({
            enemyTeam,
            enemyUnits: Array.from({ length: 1 }).map(() => {
              const unit = makeEnemyUnit({ level: 40, teamId: enemyTeam.id }, [
                Celebi,
              ])
              unit.name = npc?.name ?? unit.name
              return unit
            }),
            reward: {
              items: npc?.items ?? [],
              resources: {
                credits: 200,
              },
              xp: 5555,
            },
            onSuccess: () => {
              ctx.updateActiveWorldNode((n) => ({
                completed: true,
                visited: true,
                repeatable: false,
              }))
              ctx.nav('/world')
            },
            onFailure: () => {},
          })
        },
      }),
      choice({
        label: <>Leave</>,
        action: true,
        after: <IoMdReturnLeft />,
        back: true,
      }),
    ]

    return choices.filter((c) => c !== undefined)
  },
}
