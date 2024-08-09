import { EncounterContext, EncounterNode } from '@repo/game/types'
import { useGame } from './state'
import { useInitializeCombat } from './useInitializeCombat'
import { useEncounter } from './state/useEncounter'

export function useEncounterContext(): EncounterContext {
  const game = useGame()
  const store = useEncounter()
  const init = useInitializeCombat()

  function initializeCombat() {
    if (game.team) {
      init(game.team, game.units)
    }
  }

  return {
    activeNode: store.getActiveNode() as EncounterNode,
    encounter: store.encounter,
    initializeCombat,
  }
}
