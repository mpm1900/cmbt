import { ShopEncounter } from '@/components/encounter/encounters'
import { TestEncounter } from '@/components/encounter/encounters/TestEncounter'
import { GameWorld, GameWorldEdge, GameWorldNode } from '@/hooks/state'
import { Id } from '@repo/game/types'
import { nanoid } from 'nanoid'

function makeNode(make: (config: { id: Id }) => GameWorldNode) {
  const id = nanoid()
  return make({ id })
}

function edge(target: Id, enabled = true) {
  return {
    id: nanoid(),
    target,
    enabled,
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
  interactable: false,
  repeats: false,
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
  interactable: true,
  repeats: false,
  ...overries,
})

const TestNode: NodeMaker = (id, edges, overries) => ({
  id: test(id),
  size: 20,
  icon: 'combat',
  encounter: TestEncounter,
  edges,
  interactable: true,
  repeats: false,
  ...overries,
})

export function makeWorld(): GameWorld {
  const disabledEdge = edge(test('0'), false)
  return {
    activeNodeId: StartId,
    visitiedNodeIds: [StartId],
    nodes: [
      StartNode,
      ShopNode('0', [edge(test('0')), edge(test('1'))]),
      TestNode('0', [edge(shop('0'))]),
      TestNode('1', [edge(test('2')), edge(test('4'))], { repeats: true }),
      TestNode('4', [edge(shop('2'))]),
      TestNode('2', [edge(shop('0')), edge(test('1')), edge(shop('1'))]),
      ShopNode('1', [edge(test('0')), edge(test('3'))]),
      TestNode('3', [edge(shop('2'))]),
      ShopNode('2', [edge(test('5')), edge(test('1'))]),
      TestNode('5', []),
    ],
  }
}
