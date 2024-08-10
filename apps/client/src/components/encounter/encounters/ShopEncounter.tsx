import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Encounter, EncounterNode } from '@repo/game/types'
import { nanoid } from 'nanoid'

const ShopIntroductionNode: EncounterNode = {
  id: nanoid(),
  title: 'Test Shop',
  description:
    'Welcome to the testy test, test shop. What would you like to do?',
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
        ctx.initializeCombat()
      },
      options: [],
    },
    {
      id: nanoid(),
      label: 'Leave',
      resolve: (ctx) => {
        ctx.back()
      },
      options: [],
    },
  ],
}

const ShopWaresNode: EncounterNode = {
  id: nanoid(),
  title: 'Test Shop - View Wares',
  description: 'We have a number of things you might like!',
  choices: () => [],
  renderChoice: (choice, index, ctx) => (
    <TableRow
      onClick={() => {
        if (choice.resolve) choice.resolve(ctx)
      }}
    >
      <TableCell>
        {index + 1}) {choice.label}
      </TableCell>
    </TableRow>
  ),
  renderChoices: (ctx) => {
    const render = ctx.activeNode.renderChoice
    const choices = ctx.activeNode.choices(ctx)
    return (
      <div>
        <Table>
          {render && (
            <TableBody>{choices.map((c, i) => render(c, i, ctx))}</TableBody>
          )}
        </Table>
        <div className="flex justify-end">
          <Button
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
}
