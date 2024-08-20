import { Button } from '@/components/ui/button'
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { Key01, Key01Id, Potion, PotionId } from '@repo/game/data'
import { Encounter, EncounterNode } from '@repo/game/types'
import { nanoid } from 'nanoid'

const ShopIntroductionNode: EncounterNode = {
  id: nanoid(),
  title: 'Test Shop',
  text: 'Welcome to the testy test, test shop. What would you like to do?',
  choices: () => [
    {
      id: nanoid(),
      label: 'View Wares',
      resolve: (ctx) => {
        ctx.updateEncounter((s) => ({
          activeNodeId: ShopWaresNode.id,
        }))
      },
      options: [],
    },
    {
      id: nanoid(),
      label: 'Attack the shopkeep',
      resolve: (ctx) => {
        ctx.initializeCombat({
          enemyUnitCount: 6,
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
      label: 'Leave',
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
  text: 'We have a number of things you might like!',
  choices: (ctx) => [],
  renderChoice: (choice, index, ctx) => (
    <TableRow>
      <TableCell>{choice.label}</TableCell>
      <TableCell className="flex justify-end">
        <Button
          variant="outline"
          className="py-1 h-full"
          onClick={() => {
            if (choice.resolve) choice.resolve(ctx)
          }}
        >
          Buy 1000g
        </Button>
      </TableCell>
    </TableRow>
  ),
  renderChoices: (ctx) => {
    return (
      <div className="space-y-4">
        <Table>
          <TableHeader>
            <TableHead>#</TableHead>
            <TableHead>name</TableHead>

            <TableHead className="flex justify-end items-center">
              cost
            </TableHead>
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
                  {item.cost}g
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
