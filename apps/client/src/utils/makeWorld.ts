import {
  LockedEncounter,
  ShopEncounter,
} from '@/components/encounter/encounters'
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
const lock = (app: Id) => 'Locked' + app

export const StartId = nanoid()
const StartNode: GameWorldNode = {
  id: StartId,
  size: 20,
  icon: 'start',
  completedIcon: 'start',
  encounter: {
    id: '',
    nodes: [],
    activeNodeId: '',
    values: {},
  },
  edges: [edge(shop('0'))],
  completed: true,
  repeatable: false,
  retreatable: false,
  locked: false,
  visited: true,
}

type NodeMaker = (
  id: Id,
  edges: GameWorldEdge[],
  overries?: Partial<GameWorldNode>
) => GameWorldNode

const ShopNode: NodeMaker = (id, edges, overrides) => ({
  id: shop(id),
  size: 20,
  icon: 'shop',
  completedIcon: 'shop',
  encounter: ShopEncounter,
  edges,
  completed: false,
  repeatable: true,
  retreatable: true,
  locked: false,
  visited: false,
  ...overrides,
})

const TestNode: NodeMaker = (id, edges, overrides) => ({
  id: test(id),
  size: 20,
  icon: 'combat',
  completedIcon: 'combat',
  encounter: TestEncounter,
  edges,
  completed: false,
  repeatable: false,
  retreatable: true,
  locked: false,
  visited: false,
  ...overrides,
})

const LockedNode: NodeMaker = (id, edges, overrides) => ({
  id: lock(id),
  size: 20,
  icon: 'locked',
  completedIcon: 'unlocked',
  encounter: LockedEncounter,
  edges,
  completed: false,
  repeatable: false,
  retreatable: true,
  locked: true,
  visited: false,
  ...overrides,
})

export function makeWorld(): GameWorld {
  return {
    startingNodeId: StartId,
    activeNodeId: StartId,
    nodes: [
      StartNode,
      ShopNode('0', [edge(test('1'))]),
      TestNode('0', [edge(shop('0'))], { retreatable: false }),
      TestNode('1', [edge(test('2')), edge(test('4'))]),
      TestNode('4', [edge(lock('0'))]),
      TestNode('2', [edge(shop('0')), edge(test('1')), edge(shop('1'))]),
      ShopNode('1', [edge(test('0')), edge(test('3'))]),
      TestNode('3', [edge(lock('0'))]),
      LockedNode('0', [edge(test('5')), edge(test('1'))]),
      TestNode('5', [], { size: 30 }),
    ],
  }
}
