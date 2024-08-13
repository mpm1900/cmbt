import { Button } from '@/components/ui/button'
import { useGame } from '@/hooks/state'
import { useEncounter } from '@/hooks/state/useEncounter'
import { Navbar } from '@shared/Navbar'
import { PageLayout } from '@shared/PageLayout'
import { EncounterSidebar } from '@shared/EncounterSidebar'
import { useNavigate } from '@tanstack/react-router'
import { TeamHeader } from '@shared/TeamHeader'
import { useEffect } from 'react'
import { SigmaContainer, useLoadGraph, useSigma } from '@react-sigma/core'
import Graph from 'graphology'
import { GraphResetButton } from '@/components/world/GraphResetButton'

function LoadGraph() {
  const loadGraph = useLoadGraph()
  const game = useGame()
  const encounter = useEncounter()
  const sigma = useSigma()
  const nav = useNavigate()
  const activeNode = game.world?.nodes.find(
    (n) => n.id === game.world?.activeNodeId
  )

  function makeGraph() {
    const graph = new Graph()
    if (game.world) {
      for (let node of game.world.nodes) {
        const isActive = activeNode?.id === node.id
        const isEdgeNode = activeNode?.edges.includes(node.id)
        graph.addNode(node.id, {
          x: node.position.x,
          y: node.position.y,
          size: node.size,
          color: isActive ? 'yellow' : isEdgeNode ? 'blue' : 'grey',
        })
      }

      for (let node of game.world.nodes) {
        for (let edge of node.edges) {
          graph.addDirectedEdge(node.id, edge, { size: 2, color: 'white' })
        }
      }
    }
    return graph
  }

  useEffect(() => {
    const graph = makeGraph()
    loadGraph(graph)
  }, [loadGraph])

  useEffect(() => {
    sigma.addListener('clickNode', (payload) => {
      const node = game.world?.nodes.find((n) => n.id === payload.node)
      if (node && node.isInteractable) {
        game.setActiveNodeId(node.id)
        encounter.updateEncounter(() => node.encounter)
        nav({ to: '/encounter' })
      }
    })
  }, [sigma])

  return null
}

export function World() {
  const game = useGame()
  const encounter = useEncounter()
  const nav = useNavigate()
  if (!game.world) nav({ to: '/' })

  return (
    <PageLayout
      navbar={<Navbar />}
      aside={<EncounterSidebar />}
      header={
        <div>
          <TeamHeader team={game.team} />
        </div>
      }
    >
      {game.world && (
        <SigmaContainer
          style={{ background: 'transparent', overflow: 'hidden' }}
        >
          <LoadGraph />
          <div style={{ position: 'absolute', top: 0 }}>
            <GraphResetButton />
          </div>
        </SigmaContainer>
      )}
    </PageLayout>
  )
}
