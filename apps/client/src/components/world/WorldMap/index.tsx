import { useCy, useGame } from '@/hooks/state'
import { WorldActions } from '../WorldActions'
import { Graph } from './Graph'

export function WorldMap() {
  const game = useGame()
  const { cy, set, fitActive } = useCy()

  return (
    <>
      <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 2 }}>
        <WorldActions />
      </div>

      <Graph
        cy={(core) => {
          if (!cy) {
            set(core)
            fitActive(core)
          }
        }}
        nodes={game.world.nodes}
        activeNodeId={game.world.activeNodeId}
      />
    </>
  )
}
