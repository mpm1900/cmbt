import { ShopEncounter } from '@/components/encounter/encounters'
import { TestEncounter } from '@/components/encounter/encounters/TestEncounter'
import { GameWorld, GameWorldEdge, GameWorldNode, Id } from '@repo/game/types'
import { nanoid } from 'nanoid'

function edge(target: Id) {
  return {
    id: nanoid(),
    target,
  }
}

const shop = (app: Id) => 'Shop' + app
const test = (app: Id) => 'Test' + app

export const StartId = nanoid()
const StartNode: GameWorldNode = {
  id: StartId,
  size: 20,
  icon: 'start',
  encounter: {
    id: nanoid(),
    nodes: [],
    activeNodeId: '',
  },
  edges: [edge(shop('0'))],
  completed: true,
  repeatable: false,
}

type NodeMaker = (
  id: Id,
  edges: GameWorldEdge[],
  overries?: Partial<GameWorldNode>
) => GameWorldNode

const ShopNode: NodeMaker = (id, edges, overries) => ({
  id: shop(id),
  size: 20,
  icon: 'shop',
  encounter: ShopEncounter,
  edges,
  completed: false,
  repeatable: true,
  ...overries,
})

const TestNode: NodeMaker = (id, edges, overries) => ({
  id: test(id),
  size: 20,
  icon: 'combat',
  encounter: TestEncounter,
  edges,
  completed: false,
  repeatable: false,
  ...overries,
})

export function makeWorld(): GameWorld {
  return {
    startingNodeId: StartId,
    activeNodeId: StartId,
    nodes: [
      StartNode,
      ShopNode('0', [edge(test('1'))]),
      TestNode('0', [edge(shop('0'))]),
      TestNode('1', [edge(test('2')), edge(test('4'))], { repeatable: true }),
      TestNode('4', [edge(shop('2'))]),
      TestNode('2', [edge(shop('0')), edge(test('1')), edge(shop('1'))]),
      ShopNode('1', [edge(test('0')), edge(test('3'))]),
      TestNode('3', [edge(shop('2'))]),
      ShopNode('2', [edge(test('5')), edge(test('1'))]),
      TestNode('5', []),
    ],
  }
}
