import { useEffect } from 'react'
import { makeUnit } from '@repo/game/utils'
import { Identity, Potion, PowerDownAllOtherOnUnitEnter } from '@repo/game/data'
import { faker } from '@faker-js/faker'
import { useGameContext, useScrollToBottom } from '@/hooks'
import {
  useAiActions,
  useInputController,
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
import { CleanupSwitchUnits } from './components/CleanupSwitchUnits'
import { RequireTurnStatus } from './components/RequireTurnStatus'
import { TeamBench } from './components/TeamBench'
import { getTeamsWithSelectionRequired } from './utils/getTeamsWithSelectionRequired'
import { UnitCard } from './components/UnitCard'
import { Team } from '@repo/game/types'
import { useItems } from './hooks/state/useItems'
import { LogHeader } from './components/ui/log'
import { RunningTurn } from './components/RunningTurn'
import { useCleanupController } from './hooks/controllers/useCleanupController'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'

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
  useInputController()
  useAiActions()
  useCleanupController()
  const ref = useScrollToBottom(logs.logs.length)

  useEffect(() => {
    if (unitsStore.units.length === 0) {
      const user = teamsStore.getRandomTeamId()
      if (!teamsStore.user) {
        teamsStore.setUser(user)
      }
      const userTeam = teamsStore.teams.find((t) => t.id === user) as Team
      const aiTeam = teamsStore.teams.find((t) => t.id !== user) as Team
      const testUnit = makeUnit(userTeam.id, 'Salamence', false)
      const units = unitsStore.addUnits(
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
          maxTargetCount: 1,
        })
      )
    }
    ctx.log(<LogHeader>turn {turn.turn.count + 1}</LogHeader>)
    turn.setStatus('waiting-for-input')
  }, [])

  const userTeam = teamsStore.teams.find((t) => t.id === teamsStore.user)
  const aiTeam = teamsStore.teams.find((t) => t.id !== teamsStore.user)

  if (turn.turn.status === 'done') {
    return <h1>battle over!</h1>
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 overflow-auto">
      <div className="flex flex-1 flex-row">
        <div className="flex flex-1 flex-col justify-center">
          <div className="flex flex-1 flex-col p-2 justify-between">
            <div className="flex flex-col justify-end">
              <span>{}</span>
              <TeamBench teamId={aiTeam?.id} className="justify-end" />
              <div className="flex flex-1 items-start justify-end">
                {ctx.units
                  .filter((u) => u.teamId !== ctx.user && u.flags.isActive)
                  .map((unit) => (
                    <div key={unit.id} className="text-left p-4 px-8">
                      <UnitCard unit={unit} hideStats={true} />
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex flex-1 items-center justify-center">
              <RequireTurnStatus status="running">
                <RunningTurn />
              </RequireTurnStatus>
              <RequireTurnStatus status="waiting-for-input">
                <ActiveUnit />
              </RequireTurnStatus>
              <RequireTurnStatus status="cleanup">
                <div>
                  {getTeamsWithSelectionRequired(ctx)
                    .filter((team) => team.id === ctx.user)
                    .map((team) => (
                      <CleanupSwitchUnits key={team.id} teamId={team.id} />
                    ))}
                </div>
              </RequireTurnStatus>
            </div>
            <div className="flex flex-col-reverse justify-end">
              <TeamBench teamId={userTeam?.id} />{' '}
              <div className="flex flex-1 items-start justify-start">
                {ctx.units
                  .filter((u) => u.teamId === ctx.user && u.flags.isActive)
                  .map((unit) => (
                    <div key={unit.id} className="text-left p-4 px-8">
                      <UnitCard unit={unit} hideStats={false} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-[360px] bg-slate-950 h-screen flex" ref={ref}>
          <Tabs defaultValue="log" className="flex flex-1">
            <div className="flex flex-col w-full">
              <div className="p-2">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="log">Action Log</TabsTrigger>
                  <TabsTrigger value="mods">Modifiers</TabsTrigger>
                </TabsList>
              </div>
              <div className="flex-1 overflow-auto w-full">
                <TabsContent value="log">
                  <div className="overflow-auto">
                    {logs.logs.map((log, i) => (
                      <div key={i} className="px-2 py-0.5 overflow-hidden">
                        {log}
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="mods">
                  {modifiersStore.modifiers.map((mod) => (
                    <pre key={mod.rtid}>{JSON.stringify(mod)}</pre>
                  ))}
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default App
