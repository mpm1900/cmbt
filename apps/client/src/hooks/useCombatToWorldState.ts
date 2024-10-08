import {
  applyModifiers,
  getExperienceResult,
  rebuildUnit,
} from '@repo/game/utils'
import { useCombat, useGame } from './state'
import { useCombatContext } from './useCombatContext'

export function useCombatToWorldState() {
  const game = useGame()
  const combat = useCombat()
  const ctx = useCombatContext()

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
      if (!combatUnit) return unit

      // this sets the modifier function to include context modifiers
      if (combatUnit.flags.isActive) {
        combatUnit.modifiers = () => [
          ...unit.modifiers(),
          ...ctx.modifiers.filter(
            (m) => m.parentId === combatUnit.id && m.persistOnSwitch
          ),
        ]
      }

      const modified = applyModifiers(combatUnit, ctx).unit
      const result = getExperienceResult(
        unit.level,
        unit.xp,
        (reward.xp * modified.stats.xpMultiplier) / 100
      )
      const isDead = modified.values.damage >= modified.stats.health
      const modifiers =
        combatUnit.modifiers().filter((m) => m.persistOnCombatEnd) ?? []

      const resultUnit = rebuildUnit({
        ...unit,
        level: result.level,
        xp: result.xp,
        values: {
          ...combatUnit.values,
          damage: isDead ? combatUnit.stats.health : combatUnit.values.damage,
        },
        modifiers: () => modifiers,
      })
      resultUnit.values = {
        ...resultUnit.values,
        damage: isDead ? resultUnit.stats.health : resultUnit.values.damage,
      }

      return resultUnit
    })
  }
}
