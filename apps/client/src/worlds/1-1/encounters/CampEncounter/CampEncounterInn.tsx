import { ChoiceAttributes } from '@/components/encounter/ChoiceAttributes'
import { ChoiceLog } from '@/components/encounter/ChoiceLog'
import { Narration } from '@/components/encounter/Narration'
import { Quote } from '@/components/encounter/Quote'
import { StatRenderers } from '@/renderers/Stats'
import { check, choice, initializeNpcCombat } from '@/worlds/_utils'
import { Separator } from '@radix-ui/react-menubar'
import { Wizard } from '@repo/game/data'
import { EncounterChoice, EncounterNode } from '@repo/game/types'
import { nanoid } from 'nanoid'
import { GiCreditsCurrency, GiVillage } from 'react-icons/gi'
import { IoMdReturnLeft } from 'react-icons/io'
import { LuSwords } from 'react-icons/lu'
import { SlSpeech } from 'react-icons/sl'
import { ChibleeId, ChibleeValues } from '../../npcs/Chiblee'
import { CampEncounterActions } from './Actions'
import { CampEncounterShopId } from './CampEncounterShop'
import { CampEncounterTabs } from './Tabs'

export const CampEncounterInnId = nanoid()
export const CampEncounterInn: EncounterNode = {
  id: CampEncounterInnId,
  icon: <GiVillage />,
  title: 'Friendly Village - Inn',
  actions: (ctx) => CampEncounterActions(ctx),
  tabs: (ctx) => CampEncounterTabs(ctx),

  render: (ctx, props) => {
    const npc = ctx.npcs.find((c) => c.id === ChibleeId)

    ctx.log(
      <Narration>
        You walk over to the building labeled "Chiblee's Inn" and go inside.
      </Narration>
    )

    if (props.nodeVisitCount === 1) {
      ctx.log(
        <div>
          <span>"Allied adventurers are few and far between out here." </span>
          <Narration>
            Says the woman sitting near the fire in front of you.
          </Narration>
        </div>
      )

      ctx.log(
        <div>
          <Quote name={npc!.name}>
            "It's refreshing to see a friendly face out here. I'm {npc!.name}.
            This is my Inn. What can I do for you today?
          </Quote>
        </div>
      )
    } else {
      ctx.log(
        <Quote name={npc!.name}>
          "Welcome back to my Inn. What can I do for you today?"
        </Quote>
      )
    }
    ctx.log(<Separator />)
  },
  choices: (ctx) => {
    const npc = ctx.npcs.find((c) => c.id === ChibleeId)
    const charmAttempts = npc?.values.charmAttempts
    const totalDamage = ctx.units.reduce(
      (sum, unit) => sum + unit.values.damage,
      0
    )
    const cost = Math.round(500 * (npc?.values.costMultiplier ?? 1))
    const credits = ctx.team?.resources.credits ?? 0
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
      choice({
        disabled: !(totalDamage > 0 && credits >= cost),
        before: (
          <ChoiceAttributes>
            <GiCreditsCurrency className="w-full h-full" />
            <span>{', '}</span>
            {StatRenderers.health.icon}
          </ChoiceAttributes>
        ),
        after: (
          <ChoiceAttributes>
            -{cost}
            <GiCreditsCurrency />
          </ChoiceAttributes>
        ),
        label: `"Id like to book a room"`,
        resolve: (ctx) => {
          ctx.log(
            <div className="flex items-center space-x-2">
              <ChoiceLog>"Id like to book a room"</ChoiceLog>
              <ChoiceAttributes>
                -{cost}
                <GiCreditsCurrency />
              </ChoiceAttributes>
            </div>
          )
          ctx.log(
            <Quote name={npc!.name}>
              Sure thing! Room is right back over there.
            </Quote>
          )
          ctx.log(
            <div>
              <ChoiceAttributes>
                <span className="text-muted-foreground/40">
                  Your party's health has been refreshed.
                </span>
              </ChoiceAttributes>
            </div>
          )

          ctx.updateTeam((team) => ({
            ...team,
            resources: {
              ...team.resources,
              credits: team.resources.credits - cost,
            },
          }))
          ctx.units.forEach((unit) => {
            ctx.updateUnit(unit.id, (u) => ({
              values: {
                ...u.values,
                damage: 0,
              },
              modifiers: () => unit.modifiers().filter((m) => !m.statusId),
            }))
          })
        },
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
          initializeNpcCombat({
            npcs: [npc!],
            configs: {
              [npc!.id]: {
                level: 9,
                bases: [Wizard],
              },
            },
            xp: 55,
            ctx,
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
