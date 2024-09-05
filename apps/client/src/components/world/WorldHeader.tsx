import { useGame } from '@/hooks/state'
import { Counter } from '@shared/Counter'
import { PageHeader } from '@shared/PageHeader'
import { SidebarUnit } from '@shared/SidebarUnit'
import { GiCreditsCurrency } from 'react-icons/gi'
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from '../ui/menubar'

export function WorldHeader() {
  const game = useGame()
  const credits = game.team.resources.credits ?? 0

  return (
    <PageHeader>
      <div className="flex flex-1 justify-between">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>Team</MenubarTrigger>
            <MenubarContent className="min-w-[320px]">
              {game.units.map((unit, i) => (
                <>
                  {i !== 0 && <MenubarSeparator />}
                  <SidebarUnit unit={unit} />
                </>
              ))}
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Items</MenubarTrigger>
          </MenubarMenu>
        </Menubar>

        <div className="flex items-center space-x-1 px-4">
          <Counter
            from={game.team.resources.credits}
            to={credits}
            duration={0.5}
          />
          <GiCreditsCurrency />
        </div>
      </div>
    </PageHeader>
  )
}
