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
  Team,
} from '@repo/game/types'
import { makeEnemyUnit } from '@repo/game/utils'
import { ItemListTables } from '@shared/ItemListTables'
import { nanoid } from 'nanoid'
import { BsArrowLeft } from 'react-icons/bs'
import { GiCash, GiCreditsCurrency, GiCrossedSwords } from 'react-icons/gi'
import { IoMdReturnLeft, IoMdReturnRight } from 'react-icons/io'
import { RiSpeakLine } from 'react-icons/ri'
import { ChoiceAttributes } from '../ChoiceAttributes'
import { ChoiceLabel } from '../ChoiceLabel'
import { Narration } from '../Narration'

const enemyTeam: Team = {
  id: TeamId(),
  resources: { credits: 0 },
  items: [],
}

const ShopIntroductionNode: EncounterNode = {
  id: nanoid(),
  icon: <GiCash />,
  title: 'Test Shop',
  render: (ctx) => {
    const visitCount = ctx.encounter.visitedNodeIds.filter(
      (id) => id === ctx.encounter.activeNodeId
    ).length

    if (visitCount === 0) {
      ctx.clearLog()
      ctx.log(
        <Narration>
          You look around a dusty old shop and see small shopkeep just barely
          visable behind the counter.
        </Narration>
      )
    }
    ctx.log(
      <div>
        "Welcome to the testy test, test shop. How can I help you?"{' '}
        <Narration>You hear the shopkeep say.</Narration>
      </div>
    )
    ctx.log(<Separator />)
  },
  tabs: (ctx) => [
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
                    <RiSpeakLine />
                    {', 50%'}
                  </ChoiceAttributes>
                }
              >
                Atempt to charm the shopkeep
              </ChoiceLabel>
            ),
            resolve: (ctx) => {
              ctx.updateNpcValue(npc.id, 'charmAttempts', (v) => (v ?? 0) + 1)
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
            Attack the shopkeep
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
              }))
              ctx.clearLog()
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
          ctx.clearLog()
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
  title: 'Test Shop - View Wares',

  render: (ctx) => {
    ctx.log(<div>"We have a number of things you might like!"</div>)
    ctx.log(
      <div>
        <Narration>
          The shopkeep gestures toward the shelf behind them.
        </Narration>
      </div>
    )
    ctx.log(<Separator />)
  },
  Component: (props) => {
    const { ctx } = props
    const npc = ctx.npcs.find((c) => c.id === ShopkeepNpcId)
    const reset = () => {
      return ctx.gotoNode(ShopIntroductionNode.id)
    }
    const buyItem = (item: Item) => {
      ctx.updateNpcValue(ShopkeepNpcId, item.id, (v) => (v ?? 0) - 1)
      ctx.buyItem(item, item.cost)
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

export const ShopkeepNpcId = nanoid()
export const ShopEncounterId = nanoid()
export const ShopEncounter: Encounter = {
  id: nanoid(),
  setup: (ctx) => {
    if (!ctx.npcs.find((c) => c.id === ShopkeepNpcId)) {
      ctx.addNpc({
        id: ShopkeepNpcId,
        name: 'Shopkeep Person',
        attr: {
          alive: true,
        },
        values: {
          charmAttempts: 0,
          [PotionId]: 5,
          [Key01Id]: 1,
          [RubyId]: 1,
        },
      })
    }
  },
  activeNodeId: ShopIntroductionNode.id,
  nodes: [ShopIntroductionNode, ShopWaresNode],
  visitedNodeIds: [],
  values: {},
}
