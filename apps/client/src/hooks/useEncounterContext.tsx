import { BASE_UNIT } from '@repo/game/data'
import {
  EncounterContext,
  EncounterNode,
  Id,
  InitializeCombatOptions,
  Item,
  Unit,
} from '@repo/game/types'
import { useNavigate } from '@tanstack/react-router'
import { useGame, useNpcs } from './state'
import { useEncounter } from './state/useEncounter'
import { useCombatContext } from './useCombatContext'
import { useInitializeCombat } from './useInitializeCombat'

export function useEncounterContext(): EncounterContext {
  const game = useGame()
  const store = useEncounter()
  const init = useInitializeCombat()
  const nav = useNavigate()
  const npcs = useNpcs()
  const ctx = useCombatContext()

  function initializeCombat(props: InitializeCombatOptions) {
    if (game.team) {
      init({
        userTeam: game.team,
        userUnits: game.units,
        modifiers: props.modifiers ?? [],
        mutations: props.mutations ?? [],
        enemyTeam: props.enemyTeam,
        enemyUnits: props.enemyUnits,
        commit: props.commit,
        reward: props.reward,
        onFailure: props.onFailure,
        onSuccess: props.onSuccess,
      })
    }
  }

  function updateUnit(id: Id, fn: (unit: Unit) => Partial<Unit>) {
    game.updateUnits((u) => (u.id === id ? fn(u) : u))
  }

  function useItem(item: Item, target: Unit) {
    game.updateTeam((t) => ({
      items: t.items.filter((i) => i.rtid !== item.rtid),
    }))

    if (item.action) {
      const action = item.action(BASE_UNIT)
      const result = action.resolve(BASE_UNIT, [target], ctx)
      console.log(result)
    }
  }

  return {
    activeNode: store.getActiveNode() as EncounterNode,
    encounter: store.encounter,
    team: game.team,
    units: game.units,
    npcs: npcs.npcs,
    visitedNodeIds: game.visitedNodeIds,
    nav: (to, clearLog) => {
      if (clearLog) store.clearLog()
      return nav({ to })
    },
    back: (clearLog) => {
      if (clearLog) store.clearLog()
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
    useItem,
    addNpc: npcs.addNpc,
    updateNpcValue: npcs.updateNpcValue,
    updateNpcItems: npcs.updateNpcItems,
    addVisitedNodes: game.addVisitedNodes,
  }
}
