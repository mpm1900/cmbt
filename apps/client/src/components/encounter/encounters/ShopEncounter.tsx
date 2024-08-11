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
import { Fragment } from 'react/jsx-runtime'

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
  choices: () => [
    {
      id: nanoid(),
      label: 'Potion',
      resolve: () => {},
    },
    {
      id: nanoid(),
      label: 'Adrenaline',
      resolve: () => {},
    },
  ],
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
    const render = ctx.activeNode.renderChoice
    const choices = ctx.activeNode.choices(ctx)
    return (
      <div className="space-y-2">
        <Table>
          <TableHeader>
            <TableHead>name</TableHead>
            <TableHead className="flex justify-end items-center">
              cost
            </TableHead>
          </TableHeader>
          {render && (
            <TableBody>
              {choices.map((c, i) => (
                <Fragment key={c.id}>{render(c, i, ctx)}</Fragment>
              ))}
            </TableBody>
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
