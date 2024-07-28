import { useEffect } from 'react'
import { makeUnit } from '@repo/game/utils'
import { Identity, Potion, PowerDownAllOtherOnUnitEnter } from '@repo/game/data'
import { faker } from '@faker-js/faker'
import { useGameContext } from '@/hooks'
import {
  useAiActions,
  useIdleController,
  useTurnController,
} from '@/hooks/controllers'
import {
  useActiveUiUnit,
  useModifiers,
  useTeams,
  useTurn,
  useUnits,
} from '@/hooks/state'
import { ActiveUnit } from './components/ActiveUnit'
import { useCombatLog } from './hooks/state/useCombatLog'
import { PendingTeamAction } from './components/PendingTeamAction'
import { RequireTurnStatus } from './components/RequireTurnStatus'
import { TeamBench } from './components/TeamBench'
import { getTeamsWithSelectionRequired } from './utils/getTeamsWithSelectionRequired'
import { UnitDebug } from './components/UnitDebug'
import { Separator } from './components/ui/separator'
import { Team } from '@repo/game/types'
import { useItems } from './hooks/state/useItems'

function App() {
  const ctx = useGameContext()
  const turn = useTurn()
  const teamsStore = useTeams()
  const unitsStore = useUnits()
  const modifiersStore = useModifiers()
  const activeUnit = useActiveUiUnit()
  const logs = useCombatLog()
  const item = useItems()
  useTurnController()
  useIdleController()
  useAiActions()

  useEffect(() => {
    if (unitsStore.units.length === 0) {
      const user = teamsStore.getRandomTeamId()
      teamsStore.setUser(user)
      const userTeam = teamsStore.teams.find((t) => t.id === user) as Team
      const aiTeam = teamsStore.teams.find((t) => t.id !== user) as Team
      const testUnit = makeUnit(userTeam.id, 'Unit with Intimidate', false)
      const units = unitsStore.add(
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
        makeUnit(aiTeam.id, faker.person.fullName(), true),
        makeUnit(aiTeam.id, faker.person.fullName(), true),
        makeUnit(aiTeam.id, faker.person.fullName(), false),
        makeUnit(aiTeam.id, faker.person.fullName(), false)
      )
      console.log(
        'units',
        units.map((u) => u.flags)
      )
      modifiersStore.add(
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
        })
      )
    }
    ctx.log(
      <div className="flex flex-row items-center space-x-2 text-muted-foreground/40 font-bold uppercase">
        <span className="text-nowrap">turn {turn.turn.count + 1}</span>
        <Separator />
      </div>
    )
    turn.setStatus('idle')
  }, [])

  const userTeam = teamsStore.teams.find((t) => t.id === teamsStore.user)
  const aiTeam = teamsStore.teams.find((t) => t.id !== teamsStore.user)

  if (turn.turn.status === 'done') {
    return <h1>battle over!</h1>
  }

  console.log(modifiersStore.modifiers)

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 overflow-auto">
      <div className="flex flex-1 flex-row">
        <div className="flex flex-1 flex-col justify-center">
          <div className="flex flex-1 flex-col p-2 justify-between">
            <div className="flex flex-col justify-end">
              <span>{}</span>
              <TeamBench teamId={aiTeam?.id} />
              <div className="flex flex-1 items-start justify-center">
                {ctx.units
                  .filter((u) => u.teamId !== ctx.user && u.flags.isActive)
                  .map((unit) => (
                    <div key={unit.id} className="text-left p-4">
                      <UnitDebug unit={unit} hideStats={true} />
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex flex-1 items-center justify-center">
              <RequireTurnStatus status="idle">
                <ActiveUnit />
              </RequireTurnStatus>
              <RequireTurnStatus status="cleanup">
                <div>
                  {getTeamsWithSelectionRequired(ctx)
                    .filter((team) => team.id === ctx.user)
                    .map((team) => (
                      <PendingTeamAction key={team.id} teamId={team.id} />
                    ))
                    .find(Boolean)}
                </div>
              </RequireTurnStatus>
            </div>
            <div className="flex flex-col-reverse justify-end">
              {' '}
              <TeamBench teamId={userTeam?.id} />{' '}
              <div className="flex flex-1 items-start justify-center">
                {ctx.units
                  .filter((u) => u.teamId === ctx.user && u.flags.isActive)
                  .map((unit) => (
                    <div key={unit.id} className="text-left p-4">
                      <UnitDebug unit={unit} hideStats={false} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-[360px] bg-slate-950 overflow-auto h-screen">
          {logs.logs.map((log, i) => (
            <div key={i} className="px-2 py-1 overflow-hidden">
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
