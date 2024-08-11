import { ActiveUnit } from '@/components/builder/ActiveUnit'
import { UnitSelectButton } from '@/components/builder/UnitSelectButton'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList } from '@/components/ui/tabs'
import { MAX_UNITS_PER_TEAM } from '@/constants'
import { useEncounterContext } from '@/hooks'
import { useGame } from '@/hooks/state'
import { useBuilderUi } from '@/hooks/state/useBuilderUi'
import { useUnitBuilders } from '@/hooks/state/useUnitBuilders'
import { makeBuilder } from '@/utils/makeUnitBuilder'
import { makeWorld } from '@/utils/makeWorld'
import { Identity, PotionAction } from '@repo/game/data'
import { Unit } from '@repo/game/types'
import { resolveUnitBuilder } from '@repo/game/utils'
import { useNavigate } from '@tanstack/react-router'
import { nanoid } from 'nanoid/non-secure'
import { useEffect } from 'react'

export function Builder() {
  const nav = useNavigate()
  const game = useGame()
  const store = useUnitBuilders()
  const ui = useBuilderUi()
  const _builders = Array.from({ length: MAX_UNITS_PER_TEAM })
  const ctx = useEncounterContext()

  function initialize() {
    const team = {
      id: nanoid(),
      items: [
        {
          id: nanoid(),
          count: 1,
          action: (u: Unit) =>
            new PotionAction({
              sourceId: u.id,
              teamId: u.teamId,
              maxTargetCount: 1,
              cost: new Identity({}),
            }),
        },
      ],
    }
    const world = makeWorld()
    game.initialize({
      team,
      units: store.builders.map((b) => resolveUnitBuilder(b, team.id)),
      world,
    })
  }

  useEffect(() => {
    ui.setActiveBuilderId(store.builders[0].id)
  }, [])

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-900 overflow-auto">
      <div className="flex flex-col items-center">
        <div className="flex flex-1 p-4 space-x-4">
          <Tabs defaultValue="account w-full">
            <TabsList className="">
              {_builders.map((_, i) => (
                <UnitSelectButton
                  key={i}
                  builder={store.builders[i]}
                  onAddClick={() => {
                    const builder = makeBuilder()
                    store.addBuilder(builder)
                    ui.setActiveBuilderId(builder.id)
                  }}
                  onUnitClick={() => {
                    ui.setActiveBuilderId(store.builders[i]?.id)
                  }}
                />
              ))}
            </TabsList>
          </Tabs>
          <Button
            variant="destructive"
            disabled={store.builders.length < 2}
            onClick={() => {
              initialize()
              nav({ to: '/world' })
            }}
          >
            Start!
          </Button>
        </div>
      </div>
      {ui.activeBuilderId && <ActiveUnit />}
    </div>
  )
}
