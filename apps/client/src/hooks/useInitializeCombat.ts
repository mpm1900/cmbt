import { faker } from '@faker-js/faker'
import { TeamId } from '@repo/game/data'
import { Team, UnitBuilder } from '@repo/game/types'
import { makeUnit, resolveUnitBuilder } from '@repo/game/utils'
import { useCombat } from './state'
import { useNavigate } from '@tanstack/react-router'

export function useInitializeCombat() {
  const combat = useCombat()
  const navigate = useNavigate()

  return (builders: UnitBuilder[]) => {
    const userTeam: Team = { id: TeamId(), items: [] }
    const aiTeam: Team = { id: TeamId(), items: [] }
    const teams: Team[] = [userTeam, aiTeam]
    const inputUnits = builders.map((b) => resolveUnitBuilder(b, userTeam.id))
    const units = [
      ...inputUnits,
      makeUnit(aiTeam.id, faker.person.fullName(), false),
      makeUnit(aiTeam.id, faker.person.fullName(), false),
      makeUnit(aiTeam.id, faker.person.fullName(), false),
      makeUnit(aiTeam.id, faker.person.fullName(), false),
      makeUnit(aiTeam.id, faker.person.fullName(), false),
      makeUnit(aiTeam.id, faker.person.fullName(), false),
    ]
    combat.initialize({ teams, units, user: userTeam.id })

    navigate({
      to: '/combat',
    })
  }
}
