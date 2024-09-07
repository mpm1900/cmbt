import {
  EncounterContext,
  EncounterNode,
  Id,
  InitializeCombatOptions,
  Unit,
} from '@repo/game/types'
import { useNavigate } from '@tanstack/react-router'
import { useGame, useNpcs } from './state'
import { useEncounter } from './state/useEncounter'
import { useInitializeCombat } from './useInitializeCombat'

export function useEncounterContext(): EncounterContext {
  const game = useGame()
  const store = useEncounter()
  const init = useInitializeCombat()
  const nav = useNavigate()
  const npcs = useNpcs()

  function initializeCombat(props: InitializeCombatOptions) {
    if (game.team) {
      init({
        userTeam: game.team,
        userUnits: game.units,
        modifiers: props.modifiers ?? [],
        mutations: props.mutations ?? [],
        enemyTeam: props.enemyTeam,
        enemyUnits: props.enemyUnits,
        reward: props.reward,
        onFailure: props.onFailure,
        onSuccess: props.onSuccess,
      })
    }
  }

  function updateUnit(id: Id, fn: (unit: Unit) => Partial<Unit>) {
    game.updateUnits((u) => (u.id === id ? fn(u) : u))
  }

  return {
    activeNode: store.getActiveNode() as EncounterNode,
    encounter: store.encounter,
    team: game.team,
    units: game.units,
    npcs: npcs.npcs,
    visitedNodeIds: game.visitedNodeIds,
    nav: (to) => {
      store.clearLog()
      return nav({ to })
    },
    back: () => {
      store.clearLog()
      nav({ to: '/world' })
    },
    log: store.log,
    clearLog: store.clearLog,
    initializeCombat,
    updateActiveWorldNode: (fn) => {
      game.updateWorldNode(game.world.activeNodeId, fn)
    },
    updateEncounter: store.updateEncounter,
    gotoNode: (id) =>
      store.updateEncounter((e) => ({
        activeNodeId: id,
        visitedNodeIds: [...e.visitedNodeIds, id],
      })),
    updateTeam: game.updateTeam,
    updateUnit: updateUnit,
    buyItem: game.buyItem,
    addNpc: npcs.addNpc,
    updateNpcValue: npcs.updateNpcValue,
    addVisitedNodes: game.addVisitedNodes,
  }
}
