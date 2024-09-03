import { Id, WorldEdge, WorldNode } from '@repo/game/types'
import { nanoid } from 'nanoid'

export function edge(target: Id): WorldEdge {
  return {
    id: nanoid(),
    target,
  }
}

export type NodeMaker = (
  id: Id,
  edges: WorldEdge[],
  overries?: Partial<WorldNode>
) => WorldNode
