import { Button } from '@/components/ui/button'
import { rebaseItem } from '@/utils'
import { faker } from '@faker-js/faker'
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
  EncounterNode,
  GroupedItem,
  Item,
  Team,
} from '@repo/game/types'
import { makeEnemyUnit } from '@repo/game/utils'
import { ItemListTables } from '@shared/ItemListTables'
import { nanoid } from 'nanoid'
import { BsArrowLeft } from 'react-icons/bs'
import { GiCreditsCurrency, GiCrossedSwords } from 'react-icons/gi'
import { IoMdReturnLeft, IoMdReturnRight } from 'react-icons/io'
import { ChoiceLabel } from '../ChoiceLabel'
import { Narration } from '../Narration'

const enemyTeam: Team = {
  id: TeamId(),
  resources: { credits: 0 },
  items: [],
}

const ShopIntroductionNode: EncounterNode = {
  id: nanoid(),
  title: 'Test Shop',
  text: (
    <div className="space-y-4">
      <Narration>
        You look around a dusty old shop and see small shopkeep just barely
        visable behind the counter.
      </Narration>
      <div>
        "Welcome to the testy test, test shop. How can I help you?"{' '}
        <Narration>You hear the shopkeep say.</Narration>
      </div>
    </div>
  ),
  choices: () => [
    {
      id: nanoid(),
      label: (
        <ChoiceLabel before={<GiCreditsCurrency />}>View wares</ChoiceLabel>
      ),
      resolve: (ctx) => {
        ctx.updateEncounter((s) => ({
          activeNodeId: ShopWaresNode.id,
        }))
      },
    },
    {
      id: nanoid(),
      label: (
        <ChoiceLabel before={<GiCrossedSwords />} after={<IoMdReturnRight />}>
          Attack the shopkeep
        </ChoiceLabel>
      ),
      resolve: (ctx) => {
        ctx.initializeCombat({
          enemyTeam,
          enemyUnits: Array.from({ length: 4 }).map(() =>
            makeEnemyUnit(faker.person.fullName(), enemyTeam.id, 20)
          ),
          onSuccess: () => {
            ctx.updateActiveWorldNode((n) => ({
              completed: true,
            }))
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
          encounter: ctx.encounter,
        }))
        ctx.back()
      },
    },
  ],
}

const ShopWaresNode: EncounterNode = {
  id: nanoid(),
  title: 'Test Shop - View Wares',
  text: (
    <div className="space-y-4">
      <div>"We have a number of things you might like!"</div>
      <div>
        <Narration>
          The shopkeep gestures toward the shelf behind them.
        </Narration>
      </div>
    </div>
  ),
  choices: (ctx) => [],
  renderChoices: (ctx) => {
    const reset = () => {
      return ctx.updateEncounter((s) => ({
        activeNodeId: ShopIntroductionNode.id,
      }))
    }
    const buyItem = (item: Item) => {
      ctx.updateEncounter((e) => ({
        values: {
          ...e.values,
          [item.id]: e.values[item.id] - 1,
        },
      }))
      ctx.addItem(item)
    }
    const end = () => {
      const encounter = reset()
      ctx.updateActiveWorldNode((n) => ({
        completed: true,
        encounter,
      }))
      ctx.back()
    }
    return (
      <div className="space-y-4">
        {ctx.team && (
          <ItemListTables
            unit={ZERO_UNIT}
            items={[Potion(), Key01(), Ruby()] as GroupedItem[]}
            resources={ctx.team.resources}
            quantities={ctx.encounter.values}
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

export const ShopEncounterId = nanoid()
export const ShopEncounter: Encounter = {
  id: nanoid(),
  activeNodeId: ShopIntroductionNode.id,
  nodes: [ShopIntroductionNode, ShopWaresNode],
  values: {
    [PotionId]: 5,
    [Key01Id]: 1,
    [RubyId]: 1,
  },
}
