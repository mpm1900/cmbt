import { Button } from '@/components/ui/button'
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { faker } from '@faker-js/faker'
import { Key01, Key01Id, Potion, PotionId, TeamId } from '@repo/game/data'
import { Encounter, EncounterNode, Team } from '@repo/game/types'
import { makeEnemyUnit } from '@repo/game/utils'
import { nanoid } from 'nanoid'
import { IoMdReturnLeft, IoMdReturnRight } from 'react-icons/io'
import { Narration } from '../Narration'

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
      label: <div>View Wares</div>,
      resolve: (ctx) => {
        ctx.updateEncounter((s) => ({
          activeNodeId: ShopWaresNode.id,
        }))
      },
      options: [],
    },
    {
      id: nanoid(),
      label: (
        <div className="flex space-x-2 items-center">
          <span>Attack the shopkeep.</span>
          <IoMdReturnRight />
        </div>
      ),
      resolve: (ctx) => {
        const enemyTeam: Team = {
          id: TeamId(),
          resources: { credits: 0 },
          items: [],
        }
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
      options: [],
    },
    {
      id: nanoid(),
      label: (
        <div className="flex space-x-2 items-center">
          <IoMdReturnLeft />
          <span>Leave</span>
        </div>
      ),
      resolve: (ctx) => {
        ctx.updateActiveWorldNode((n) => ({
          completed: true,
          encounter: ctx.encounter,
        }))
        ctx.back()
      },
      options: [],
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
  renderChoice: (choice, index, ctx) => null,
  renderChoices: (ctx) => {
    return (
      <div className="space-y-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>name</TableHead>

              <TableHead className="flex justify-end items-center">
                cost
              </TableHead>
            </TableRow>
          </TableHeader>
          {[Potion(), Key01()].map((item) => (
            <TableRow>
              <TableCell
                width={32}
                className={cn({
                  'text-red-400': ctx.encounter.values[item.id] <= 0,
                })}
              >
                x{ctx.encounter.values[item.id]}
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell className="flex justify-end items-center">
                <Button
                  disabled={
                    (ctx.team?.resources.credits ?? 0) < item.cost ||
                    ctx.encounter.values[item.id] <= 0
                  }
                  variant="outline"
                  className={cn({
                    'text-red-400':
                      (ctx.team?.resources.credits ?? 0) < item.cost,
                  })}
                  onClick={() => {
                    ctx.updateEncounter((e) => ({
                      values: {
                        ...e.values,
                        [item.id]: e.values[item.id] - 1,
                      },
                    }))
                    ctx.addItem(item)
                  }}
                >
                  Buy {item.cost}g
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </Table>
        <div className="flex justify-end">
          <Button
            variant="secondary"
            onClick={() => {
              ctx.updateEncounter((s) => ({
                activeNodeId: ShopIntroductionNode.id,
              }))
            }}
          >
            Back
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
  },
}
