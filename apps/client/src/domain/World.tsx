import { Button } from '@/components/ui/button'
import { useGame } from '@/hooks/state'
import { useEncounter } from '@/hooks/state/useEncounter'
import { Navbar } from '@shared/Navbar'
import { useNavigate } from '@tanstack/react-router'

export function World() {
  const game = useGame()
  const encounter = useEncounter()
  const nav = useNavigate()
  if (!game.world) nav({ to: '/' })

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-900 overflow-auto">
      <div className="flex flex-1 flex-row">
        <Navbar />
        {game.world && (
          <div className="flex flex-col flex-1 items-center justify-center">
            <div>Encounters</div>
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
      </div>
    </div>
  )
}
