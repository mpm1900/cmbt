import { getNodeState } from '@/components/world/WorldMap/getNodeState'
import { Core } from 'cytoscape'
import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { useGame } from './useGame'

export type CyState = {
  cy: Core | undefined
}

export type CyStore = CyState & {
  set: (cy: Core) => void
  centerActive: (cy: Core) => void
  fitActive: (cy: Core) => void
  fitAll: (cy: Core) => void
}

export const CyContext = createContext<CyStore>({
  cy: undefined,
  set: () => {},
  centerActive: () => {},
  fitActive: () => {},
  fitAll: () => {},
})

export const useCy = () => useContext(CyContext)

export function CyContextProvider(props: PropsWithChildren) {
  const game = useGame()
  const [cy, set] = useState<Core>()

  function fitAll(core: Core) {
    core.animate({
      duration: 200,
      fit: {
        eles: core.nodes(),
        padding: 64,
      },
    })
  }

  function centerActive(core: Core) {
    const active = core.nodes(`#${game.world.activeNodeId}`).first()
    core.animate({
      duration: 200,
      center: {
        eles: active,
      },
      zoom: 3,
    })
  }

  function fitActive(core: Core) {
    const activeNode = core.nodes(`#${game.world.activeNodeId}`).first()
    const nodes = core.nodes().filter((n) => {
      const state = getNodeState(n, {
        activeNode,
        hoverNode: undefined,
      })
      return state.isActive || !!state.isActiveNeightbor
    })
    const nodesRadio = 1 / (nodes.size() / core.nodes().size())
    core.animate({
      duration: 200,
      fit: {
        eles: nodes,
        padding: nodesRadio * 48,
      },
    })
  }

  return (
    <CyContext.Provider value={{ cy, set, centerActive, fitActive, fitAll }}>
      {props.children}
    </CyContext.Provider>
  )
}
