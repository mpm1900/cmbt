import { useCombat, useGame } from './state'

export function useCombatToWorldState() {
  const game = useGame()
  const combat = useCombat()

  return () => {
    game.updateUnits((unit) => {
      const combatUnit = combat.units.find((u) => u.id === unit.id)
      return {
        values: combatUnit?.values,
        modifiers: () =>
          combatUnit?.modifiers().filter((m) => m.persistOnCombatEnd) ?? [],
      }
    })
  }
}
