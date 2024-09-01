import { useCombat, useGame } from './state'

export function useCombatToWorldState() {
  const game = useGame()
  const combat = useCombat()

  return () => {
    const reward = combat.reward
    game.updateTeam((team) => ({
      resources: {
        ...team.resources,
        credits: team.resources.credits + reward.resources.credits,
      },
      items: [...team.items, ...reward.items],
    }))
    game.updateUnits((unit) => {
      const combatUnit = combat.units.find((u) => u.id === unit.id)
      return {
        xp: unit.xp + reward.xp,
        values: combatUnit?.values,
        modifiers: () =>
          combatUnit?.modifiers().filter((m) => m.persistOnCombatEnd) ?? [],
      }
    })
  }
}
