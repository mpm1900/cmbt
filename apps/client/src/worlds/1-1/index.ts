import {
  LockedEncounter,
  ShopEncounter,
} from '@/components/encounter/encounters'
import { SpringEncounter } from '@/components/encounter/encounters/SpringEncounter'
import { TestEncounter } from '@/components/encounter/encounters/TestEncounter'
import { Id, World, WorldNode } from '@repo/game/types'
import { nanoid } from 'nanoid'
import { edge, NodeMaker } from '../_utils'

const spring = (app: Id) => 'Spring' + app
const shop = (app: Id) => 'Shop' + app
const test = (app: Id) => 'Test' + app
const lock = (app: Id) => 'Locked' + app

export const StartId = nanoid()
const StartNode: WorldNode = {
  id: StartId,
  size: 20,
  icon: 'start',
  completedIcon: 'start',
  encounter: {
    id: '',
    nodes: [],
    activeNodeId: '',
    values: {},
    setup: () => {},
  },
  edges: [edge(shop('0'))],
  completed: true,
  repeatable: false,
  retreatable: false,
  locked: false,
  visited: true,
}

const ShopNode: NodeMaker = (id, edges, overrides) => ({
  id: shop(id),
  size: 20,
  icon: '?',
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

const SpringNode: NodeMaker = (id, edges, overrides) => ({
  id: spring(id),
  size: 20,
  icon: '?',
  visitedIcon: 'spring',
  completedIcon: 'spring',
  encounter: SpringEncounter,
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
  icon: '?',
  visitedIcon: 'combat',
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

export function makeWorld1_1(): World {
  return {
    startingNodeId: StartId,
    activeNodeId: StartId,
    nodes: [
      StartNode,
      ShopNode('0', [edge(test('1'))]),
      TestNode('0', [edge(shop('0'))], { retreatable: false }),
      TestNode('1', [edge(test('2')), edge(test('4'))]),
      TestNode('4', [edge(lock('0'))]),
      TestNode('2', [edge(shop('0')), edge(test('1')), edge(spring('0'))]),
      SpringNode('0', [edge(test('0')), edge(test('3'))]),
      TestNode('3', [edge(lock('0'))]),
      LockedNode('0', [edge(test('5')), edge(test('1'))]),
      TestNode('5', [], { size: 30 }),
    ],
  }
}
