import { makeUnit } from '@repo/game/utils'
import { useEffect } from 'react'
import { useCombatContext } from './useCombatContext'
import { useActiveUiUnit, useCombat, useTurn } from './state'
import { faker } from '@faker-js/faker'
import { Team } from '@repo/game/types'
import { Identity, Potion, PowerDownAllOtherOnUnitEnter } from '@repo/game/data'
import { LogHeader } from '@/components/ui/log'
import { useItems } from './state/useItems'

export function useCombatSetup() {
  const ctx = useCombatContext()
  const turn = useTurn()
  const combat = useCombat()
  const activeUnit = useActiveUiUnit()
  const item = useItems()
  useEffect(() => {
    if (ctx.units.length === 0) {
      const user = combat.getRandomTeamId()
      if (!combat.user) {
        combat.setUser(user)
      }
      const userTeam = ctx.teams.find((t) => t.id === user) as Team
      const aiTeam = ctx.teams.find((t) => t.id !== user) as Team
      const testUnit = makeUnit(userTeam.id, 'Salamence', false)
      const units = combat.setUnits([
        makeUnit(userTeam.id, faker.person.fullName(), true),
        makeUnit(userTeam.id, faker.person.fullName(), true),
        makeUnit(userTeam.id, faker.person.fullName(), false),
        {
          ...testUnit,
          values: {
            ...testUnit.values,
            // damage: testUnit.stats.health,
          },
          modifiers: () => [
            new PowerDownAllOtherOnUnitEnter({
              sourceId: testUnit.id,
              coef: 1.5,
              duration: 0,
            }),
          ],
        },
        makeUnit(userTeam.id, faker.person.fullName(), false),
        makeUnit(userTeam.id, faker.person.fullName(), false),
        makeUnit(aiTeam.id, faker.person.fullName(), true),
        makeUnit(aiTeam.id, faker.person.fullName(), true),
        makeUnit(aiTeam.id, faker.person.fullName(), false),
        makeUnit(aiTeam.id, faker.person.fullName(), false),
        makeUnit(aiTeam.id, faker.person.fullName(), false),
        makeUnit(aiTeam.id, faker.person.fullName(), false),
      ])
      console.log(
        'units',
        units.map((u) => u.flags)
      )
      combat.add(
        units.filter((u) => u.flags.isActive).flatMap((u) => u.modifiers())
      )

      activeUnit.setUnit(
        units.find((u) => u.flags.isActive && u.teamId === user)
      )

      item.addItems(
        new Potion({
          sourceId: user,
          teamId: user,
          cost: new Identity({}),
          count: 1,
          attackType: 'physical',
          maxTargetCount: 1,
        })
      )
    }
    ctx.log(<LogHeader>turn {turn.turn.count + 1}</LogHeader>)
    turn.setStatus('waiting-for-input')
  }, [])
}
