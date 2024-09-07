import { ChoiceAttributes } from '@/components/encounter/ChoiceAttributes'
import { ChoiceLabel } from '@/components/encounter/ChoiceLabel'
import { ChoiceLog } from '@/components/encounter/ChoiceLog'
import { Narration } from '@/components/encounter/Narration'
import { Quote } from '@/components/encounter/Quote'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { rebaseItem } from '@/utils'
import {
  Key01,
  Key01Id,
  Potion,
  PotionId,
  Ruby,
  RubyId,
  TeamId,
  ZERO_UNIT,
} from '@repo/game/data'
import {
  Encounter,
  EncounterChoice,
  EncounterNode,
  GroupedItem,
  Item,
  Npc,
  Team,
} from '@repo/game/types'
import { makeEnemyUnit } from '@repo/game/utils'
import { ItemListTables } from '@shared/ItemListTables'
import { nanoid } from 'nanoid'
import random from 'random'
import { BsArrowLeft } from 'react-icons/bs'
import { GiCash, GiCreditsCurrency, GiCrossedSwords } from 'react-icons/gi'
import { IoMdReturnLeft, IoMdReturnRight } from 'react-icons/io'
import { LuSwords } from 'react-icons/lu'
import { SlSpeech } from 'react-icons/sl'

type ShopKeepNpcValues = {
  charmAttempts: number
  costMultiplier: number
}

const enemyTeam: Team = {
  id: TeamId(),
  resources: { credits: 0 },
  items: [],
  maxActiveUnits: 2,
}

const ShopIntroductionNode: EncounterNode = {
  id: nanoid(),
  icon: <GiCash />,
  title: 'Friendly Camp',
  render: (ctx) => {
    const npc = ctx.npcs.find((c) => c.id === ShopkeepNpcId)
    ctx.log(
      <div className="space-y-4">
        <div>
          <span>"Allied aventurers are few and far between out here." </span>
          <Narration>
            Says the woman sitting near the fire in front of you.
          </Narration>
        </div>
        <div>
          <Quote name={npc!.name}>
            "I'm {npc!.name}, a shopkeep of sorts. What can I do for you?"
          </Quote>
        </div>
      </div>
    )
    ctx.log(<Separator />)
  },
  actions: (ctx) => [
    {
      id: nanoid(),
      label: <ChoiceLabel after={<IoMdReturnLeft />}>Leave</ChoiceLabel>,
      resolve: (ctx) => {
        ctx.updateActiveWorldNode((n) => ({
          completed: true,
          visited: true,
          encounter: ctx.encounter,
        }))
        ctx.back()
      },
    },
  ],
  tabs: (ctx) => [
    {
      id: nanoid(),
      active: true,
      label: <>Shop</>,
      resolve: (ctx) => {},
    },
    {
      id: nanoid(),
      label: <>Combat Training</>,
      resolve: (ctx) => {
        ctx.clearLog()
        ctx.gotoNode(CombatTraining.id)
      },
    },
  ],
  choices: (ctx) => {
    const npc = ctx.npcs.find((c) => c.id === ShopkeepNpcId)
    const charmAttempts = npc?.values.charmAttempts
    const choices: (EncounterChoice | undefined)[] = [
      {
        id: nanoid(),
        label: (
          <ChoiceLabel
            before={
              <ChoiceAttributes>
                <GiCreditsCurrency />
              </ChoiceAttributes>
            }
          >
            View wares
          </ChoiceLabel>
        ),
        resolve: (ctx) => {
          ctx.log(<ChoiceLog>View wares</ChoiceLog>)
          ctx.gotoNode(ShopWaresNode.id)
        },
      },
      charmAttempts === 0 && npc
        ? {
            id: nanoid(),
            label: (
              <ChoiceLabel
                before={
                  <ChoiceAttributes>
                    <SlSpeech />
                    {', 50%'}
                  </ChoiceAttributes>
                }
              >
                Atempt to charm {npc!.name}
              </ChoiceLabel>
            ),
            resolve: (ctx) => {
              const chance = 50
              const roll = random.int(0, 100)
              const success = chance >= roll
              ctx.log(
                <div className="flex items-center space-x-2">
                  <ChoiceLog>Attempt to charm {npc!.name}</ChoiceLog>
                  {success ? (
                    <span className="text-green-400">[Success]</span>
                  ) : (
                    <span className="text-red-400">[Failure]</span>
                  )}
                </div>
              )

              ctx.updateNpcValue<keyof ShopKeepNpcValues>(
                npc.id,
                'charmAttempts',
                (v) => v! + 1
              )

              if (success) {
                ctx.updateNpcValue<keyof ShopKeepNpcValues>(
                  npc.id,
                  'costMultiplier',
                  (v) => v! * (1 - 0.1)
                )
                ctx.log(
                  <Quote name={npc!.name}>
                    "Oh you're too kind. I'm flattered. Just for that, I'll give
                    you 10% off my prices."
                  </Quote>
                )
              } else {
                ctx.log(
                  <Quote name={npc!.name}>
                    "Your charms won't work on me!"
                  </Quote>
                )
              }
              ctx.log(<Separator />)
            },
          }
        : undefined,
      {
        id: nanoid(),
        label: (
          <ChoiceLabel
            before={
              <ChoiceAttributes>
                <GiCrossedSwords />
              </ChoiceAttributes>
            }
            after={<IoMdReturnRight />}
          >
            Attack {npc!.name}
          </ChoiceLabel>
        ),
        resolve: (ctx) => {
          ctx.initializeCombat({
            enemyTeam,
            enemyUnits: Array.from({ length: 1 }).map(() => {
              const unit = makeEnemyUnit({ level: 40, teamId: enemyTeam.id })
              unit.name = npc?.name ?? unit.name
              return unit
            }),
            reward: {
              items: [],
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
      },
      {
        id: nanoid(),
        label: <ChoiceLabel after={<IoMdReturnLeft />}>Leave</ChoiceLabel>,
        resolve: (ctx) => {
          ctx.updateActiveWorldNode((n) => ({
            completed: true,
            visited: true,
            encounter: ctx.encounter,
          }))
          ctx.back()
        },
      },
    ]

    return choices.filter((c) => c !== undefined)
  },
}

const ShopWaresNode: EncounterNode = {
  id: nanoid(),
  icon: <GiCash />,
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
    {
      id: nanoid(),
      label: <ChoiceLabel after={<IoMdReturnLeft />}>Leave</ChoiceLabel>,
      resolve: (ctx) => {
        ctx.updateActiveWorldNode((n) => ({
          completed: true,
          visited: true,
          encounter: ctx.encounter,
        }))
        ctx.back()
      },
    },
  ],
  tabs: (ctx) => [
    {
      id: nanoid(),
      active: true,
      label: <>Shop</>,
      resolve: (ctx) => {},
    },
    {
      id: nanoid(),
      label: <>Combat Training</>,
      resolve: (ctx) => {
        ctx.clearLog()
        ctx.gotoNode(CombatTraining.id)
      },
    },
  ],
  Component: (props) => {
    const { ctx } = props
    const npc = ctx.npcs.find((c) => c.id === ShopkeepNpcId)
    const reset = () => {
      return ctx.gotoNode(ShopIntroductionNode.id)
    }
    const buyItem = (item: Item) => {
      if (npc) {
        ctx.updateNpcValue(ShopkeepNpcId, item.id, (v) => v! - 1)
        const cost = Math.round(item.cost * npc.values.costMultiplier)
        ctx.buyItem(item, cost)
      }
    }
    const end = () => {
      const encounter = reset()
      ctx.updateActiveWorldNode((n) => ({
        completed: true,
        visited: true,
        encounter,
      }))
      ctx.back()
    }

    return (
      <div className="space-y-4">
        {ctx.team && npc && (
          <ItemListTables
            unit={ZERO_UNIT}
            items={[Potion(), Key01(), Ruby()] as GroupedItem[]}
            costMultiplier={npc.values.costMultiplier}
            resources={ctx.team.resources}
            quantities={npc?.values}
            onClick={(item) => {
              buyItem(rebaseItem(item))
            }}
          />
        )}

        <div className="flex justify-end space-x-4">
          <Button
            variant="secondary"
            className="space-x-2"
            onClick={() => {
              reset()
            }}
          >
            <BsArrowLeft />
            <span>Back</span>
          </Button>
          <Button
            variant="secondary"
            className="space-x-2"
            onClick={() => {
              end()
            }}
          >
            <span>Leave</span>
            <IoMdReturnRight />
          </Button>
        </div>
      </div>
    )
  },
}

const CombatTraining: EncounterNode = {
  id: nanoid(),
  icon: <LuSwords />,
  title: 'Friendly Camp - Combat Training',
  actions: (ctx) => [
    {
      id: nanoid(),
      label: <ChoiceLabel after={<IoMdReturnLeft />}>Leave</ChoiceLabel>,
      resolve: (ctx) => {
        ctx.updateActiveWorldNode((n) => ({
          completed: true,
          visited: true,
          encounter: ctx.encounter,
        }))
        ctx.back()
      },
    },
  ],
  tabs: (ctx) => [
    {
      id: nanoid(),
      label: <>Shop</>,
      resolve: (ctx) => {
        ctx.clearLog()
        ctx.gotoNode(ShopIntroductionNode.id)
      },
    },
    {
      id: nanoid(),
      active: true,
      label: <>Combat Training</>,
      resolve: (ctx) => {},
    },
  ],
}

export const ShopkeepNpcId = nanoid()
export const ShopEncounterId = nanoid()
export const ShopEncounter = (): Encounter => {
  const shopNpc: Npc<ShopKeepNpcValues> = {
    id: ShopkeepNpcId,
    name: 'Chiblee',
    attr: {
      alive: true,
    },
    values: {
      charmAttempts: 0,
      costMultiplier: 1.4,
      [PotionId]: 5,
      [Key01Id]: 1,
      [RubyId]: 1,
    },
  }
  return {
    id: ShopEncounterId,
    setup: (ctx) => {
      ctx.clearLog()
      ctx.updateEncounter((e) => ({ visitedNodeIds: [] }))
      if (!ctx.npcs.find((c) => c.id === ShopkeepNpcId)) {
        ctx.addNpc(shopNpc)
      }
      ctx.log(<Narration>Your party finds a fiendly camp.</Narration>)
    },
    activeNodeId: ShopIntroductionNode.id,
    nodes: [ShopIntroductionNode, ShopWaresNode, CombatTraining],
    visitedNodeIds: [],
    values: {},
  }
}
