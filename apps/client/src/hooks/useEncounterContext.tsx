import { EncounterContext, EncounterNode } from '@repo/game/types'
import { useGame } from './state'
import { useInitializeCombat } from './useInitializeCombat'
import { useEncounter } from './state/useEncounter'
import { useNavigate } from '@tanstack/react-router'

export function useEncounterContext(): EncounterContext {
  const game = useGame()
  const store = useEncounter()
  const init = useInitializeCombat()
  const nav = useNavigate()

  function initializeCombat() {
    if (game.team) {
      init(game.team, game.units)
    }
  }

  return {
    activeNode: store.getActiveNode() as EncounterNode,
    encounter: store.encounter,
    back: () => nav({ to: '/' }),
    initializeCombat,
    updateEncounter: store.updateEncounter,
  }
}
