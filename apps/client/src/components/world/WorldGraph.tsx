import Skull from '@/assets/skull.svg'
import { useGame } from '@/hooks/state'
import { useEncounter } from '@/hooks/state/useEncounter'
import { useLoadGraph, useRegisterEvents, useSigma } from '@react-sigma/core'
import { useLayoutNoverlap } from '@react-sigma/layout-noverlap'
import { useLayoutRandom } from '@react-sigma/layout-random'
import { useNavigate } from '@tanstack/react-router'
import { MultiDirectedGraph } from 'graphology'
import { useEffect } from 'react'

export function WorldGraph() {
  const game = useGame()
  const encounter = useEncounter()
  const loadGraph = useLoadGraph()
  const sigma = useSigma()
  const registerEvents = useRegisterEvents()

  const nolap = useLayoutNoverlap()
  const { assign } = useLayoutRandom()
  const nav = useNavigate()
  const activeNode = game.world?.nodes.find(
    (n) => n.id === game.world?.activeNodeId
  )

  function makeGraph() {
    const graph = new MultiDirectedGraph()
    if (game.world) {
      for (let node of game.world.nodes) {
        const isActive = activeNode?.id === node.id
        const isEdgeNode = activeNode?.edges.includes(node.id)
        graph.addNode(node.id, {
          label: isActive ? `${node.x},${node.y}` : '?',
          x: node.x,
          y: node.y,
          size: node.size,
          pictoColor: 'white',
          image: Skull,
          color: isActive ? 'yellow' : isEdgeNode ? 'blue' : 'grey',
          highlighted: isActive,
        })
      }

      for (let node of game.world.nodes) {
        const isActive = activeNode?.id === node.id

        for (let edge of node.edges) {
          if (edge !== activeNode?.id) {
            graph.addDirectedEdge(node.id, edge, {
              size: 5,
              type: 'arrow',
              color: isActive ? '#ffffff' : 'grey',
            })
          }
        }
      }
    }
    return graph
  }

  useEffect(() => {
    const graph = makeGraph()
    loadGraph(graph, true)
    nolap.assign()
  }, [loadGraph])

  useEffect(() => {
    registerEvents({
      clickNode: (payload) => {
        const isEdgeNode = activeNode?.edges.includes(payload.node)
        const isActive = activeNode?.id === payload.node
        if (isEdgeNode || isActive) {
          const node = game.world?.nodes.find((n) => n.id === payload.node)
          if (node && node.isInteractable) {
            game.setActiveNodeId(node.id)
            encounter.updateEncounter(() => node.encounter)
            nav({ to: '/encounter' })
          }
        }
      },
    })
  }, [])

  return null
}
