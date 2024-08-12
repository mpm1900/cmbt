import {
  EncounterContext,
  EncounterNode,
  InitializeCombatProps,
} from '@repo/game/types'
import { useGame } from './state'
import { useInitializeCombat } from './useInitializeCombat'
import { useEncounter } from './state/useEncounter'
import { useNavigate } from '@tanstack/react-router'

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
    back: () => nav({ to: '/world' }),
    initializeCombat,
    updateEncounter: store.updateEncounter,
    updateTeam: game.updateTeam,
  }
}
