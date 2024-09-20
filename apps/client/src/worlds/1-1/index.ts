import { Id, World, WorldNode } from '@repo/game/types'
import { nanoid } from 'nanoid'
import { e, NodeMaker } from '../_utils'
import {
  CampEncounter,
  CombatEncounter,
  FirstCombatEncounter,
  HealingEncounter,
  ReviveEncounter,
} from './encounters'
import { GolemEncounter } from './encounters/GolemEncounter'

const fcombat = (app: Id) => 'FirstCombat' + app
const heal = (app: Id) => 'Spring' + app
const village = (app: Id) => 'Village' + app
const combat = (app: Id) => 'Combat' + app
const golem = (app: Id) => 'Golem' + app
const revive = (app: Id) => 'Revive' + app

export const FirstCombatId = nanoid()
const FirstCombatNode: NodeMaker = (id, edges, overrides) => ({
  id: fcombat(id),
  size: 20,
  icon: '?',
  seenIcon: 'combat',
  completedIcon: 'combat',
  encounter: FirstCombatEncounter(),
  edges,
  seen: false,
  completed: false,
  repeatable: false,
  retreatable: false,
  locked: false,
  visited: false,
  ...overrides,
})
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
    visitedNodeIds: [],
    values: {},
    setup: () => {},
  },
  edges: [e(fcombat('0'))],
  seen: false,
  completed: true,
  repeatable: false,
  retreatable: false,
  locked: false,
  visited: true,
}

const ShopNode: NodeMaker = (id, edges, overrides) => ({
  id: village(id),
  size: 40,
  icon: '?',
  seenIcon: 'shop',
  completedIcon: 'shop',
  encounter: CampEncounter(),
  edges,
  seen: false,
  completed: false,
  repeatable: true,
  retreatable: true,
  locked: false,
  visited: false,
  ...overrides,
})

const HealingNode: NodeMaker = (id, edges, overrides) => ({
  id: heal(id),
  size: 20,
  icon: '?',
  visitedIcon: 'spring',
  completedIcon: 'spring',
  encounter: HealingEncounter,
  edges,
  seen: false,
  completed: false,
  repeatable: true,
  retreatable: true,
  locked: false,
  visited: false,
  ...overrides,
})

const CombatNode: NodeMaker = (id, edges, overrides) => ({
  id: combat(id),
  size: 20,
  icon: '?',
  seenIcon: 'combat',
  visitedIcon: 'combat',
  completedIcon: 'combat',
  encounter: CombatEncounter(),
  // encounter: FirstCombatEncounter(),
  edges,
  seen: false,
  completed: false,
  repeatable: false,
  retreatable: true,
  locked: false,
  visited: false,
  ...overrides,
})

const ReviveNode: NodeMaker = (id, edges, overrides) => ({
  id: revive(id),
  size: 20,
  icon: '?',
  visitedIcon: 'altar',
  completedIcon: 'altar',
  encounter: ReviveEncounter,
  edges,
  seen: false,
  completed: false,
  repeatable: true,
  retreatable: true,
  locked: false,
  visited: false,
  ...overrides,
})

const GolemNode: NodeMaker = (id, edges, overrides) => ({
  id: golem(id),
  size: 20,
  icon: '?',
  visitedIcon: '?',
  completedIcon: 'combat',
  encounter: GolemEncounter(),
  edges,
  seen: false,
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
      { ...FirstCombatNode('0', [e(village('0'))]), seen: true },
      ShopNode('0', [e(combat('1'))]),
      CombatNode('0', [e(combat('2'))], { retreatable: false }),
      CombatNode('1', [e(combat('2'))]),
      CombatNode('4', [e(golem('0')), e(revive('0'))]),
      ReviveNode('0', [e(combat('4')), e(combat('5'))]),
      CombatNode('2', [e(village('0')), e(heal('0'))]),
      HealingNode('0', [e(combat('0')), e(combat('3'))]),
      CombatNode('3', [e(golem('0')), e(combat('6'))]),
      GolemNode('0', [e(combat('1')), e(combat('4')), e(heal('1'))]),
      CombatNode('5', [], { size: 30 }),
      CombatNode('6', [e(combat('3')), e(revive('0'))]),
      HealingNode('1', [e(golem('0'))]),
    ],
  }
}
