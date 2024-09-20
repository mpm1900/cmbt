import { Encounter } from '@repo/game/types'
import { nanoid } from 'nanoid'

export const GolemEncounterId = nanoid()
export const GolemEncounter: Encounter = {
  id: GolemEncounterId,
  setup: (ctx, props) => {},
  activeNodeId: '',
  nodes: [],
  visitedNodeIds: [],
  values: {},
}
