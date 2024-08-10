import { nanoid } from 'nanoid'
import { Encounter, EncounterNode } from '../../types'

const ShopIntroductionNode: EncounterNode = {
  id: nanoid(),
  title: 'Test Shop',
  description:
    'Welcome to the testy test, test shop. What would you like to do?',
  choices: [
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
  choices: [
    {
      id: nanoid(),
      label: 'Back',
      options: [],
      resolve: (ctx) => {
        ctx.updateEncounter((s) => ({
          activeNodeId: ShopIntroductionNode.id,
        }))
      },
    },
  ],
  renderChoice: (choice) => <div>{choice.label}</div>,
}

export const ShopEncounterId = nanoid()
export const ShopEncounter: Encounter = {
  id: nanoid(),
  activeNodeId: ShopIntroductionNode.id,
  nodes: [ShopIntroductionNode, ShopWaresNode],
}
