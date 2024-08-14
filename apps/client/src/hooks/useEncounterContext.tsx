import {
  EncounterContext,
  EncounterNode,
  InitializeCombatProps,
} from '@repo/game/types'
import { useNavigate } from '@tanstack/react-router'
import { useGame } from './state'
import { useEncounter } from './state/useEncounter'
import { useInitializeCombat } from './useInitializeCombat'

export function useEncounterContext(): EncounterContext {
  const game = useGame()
  const store = useEncounter()
  const init = useInitializeCombat()
  const nav = useNavigate()

  function initializeCombat(props: InitializeCombatProps) {
    if (game.team) {
      init({
        userTeam: game.team,
        userUnits: game.units,
        modifiers: [],
        mutations: [],
        enemyUnitCount: props.enemyUnitCount,
      })
    }
  }

  return {
    activeNode: store.getActiveNode() as EncounterNode,
    encounter: store.encounter,
    team: game.team,
    back: () => nav({ to: '/world2' }),
    initializeCombat,
    updateEncounter: store.updateEncounter,
    updateTeam: game.updateTeam,
    addItem: game.addItem,
  }
}
