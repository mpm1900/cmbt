import { Button } from '@/components/ui/button'
import { useGame } from '@/hooks/state'
import { useEncounter } from '@/hooks/state/useEncounter'
import { Navbar } from '@shared/Navbar'
import { PageLayout } from '@shared/PageLayout'
import { EncounterSidebar } from '@shared/EncounterSidebar'
import { useNavigate } from '@tanstack/react-router'
import { TeamHeader } from '@shared/TeamHeader'

export function World() {
  const game = useGame()
  const encounter = useEncounter()
  const nav = useNavigate()
  if (!game.world) nav({ to: '/' })

  return (
    <PageLayout
      navbar={<Navbar />}
      aside={<EncounterSidebar />}
      header={<TeamHeader team={game.team} />}
    >
      {game.world && (
        <div className="flex flex-col flex-1 items-center justify-center space-y-3">
          <div>Encounters</div>
          <div>
            (Imagine like a world map where you click where you want to go)
          </div>

          {game.world?.tiles.map((tile) => (
            <Button
              key={tile.id}
              onClick={() => {
                encounter.updateEncounter((s) => tile.encounter)
                nav({ to: '/encounter' })
              }}
            >
              {tile.id}
            </Button>
          ))}
        </div>
      )}
    </PageLayout>
  )
}
