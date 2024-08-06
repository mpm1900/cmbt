import { Button } from '@/components/ui/button'
import { useCombat } from '@/hooks/state'
import { faker } from '@faker-js/faker'
import { PowerDownAllOtherOnUnitEnter, TeamId } from '@repo/game/data'
import { Team } from '@repo/game/types'
import { makeUnit } from '@repo/game/utils'
import { useNavigate } from '@tanstack/react-router'

export function Builder() {
  const navigate = useNavigate()
  const combat = useCombat()

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 overflow-auto">
      <div className="p-4">
        <Button
          onClick={() => {
            const userTeam: Team = { id: TeamId() }
            const aiTeam: Team = { id: TeamId() }
            const teams: Team[] = [userTeam, aiTeam]
            const testUnit = makeUnit(userTeam.id, 'Salamence', false)
            const units = [
              makeUnit(userTeam.id, faker.person.fullName(), true),
              makeUnit(userTeam.id, faker.person.fullName(), true),
              makeUnit(userTeam.id, faker.person.fullName(), false),
              {
                ...testUnit,
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
            ]
            combat.initialize({ teams, units, user: userTeam.id })

            navigate({
              to: '/combat',
            })
          }}
        >
          Initialize Combat
        </Button>
      </div>
    </div>
  )
}
