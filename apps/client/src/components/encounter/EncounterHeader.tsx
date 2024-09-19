import { useGame } from '@/hooks/state'
import { BeastiaryMenu } from '@shared/BeastiaryMenu'
import { Counter } from '@shared/Counter'
import { ItemsMenu } from '@shared/ItemsMenu'
import { PageHeader } from '@shared/PageHeader'
import { UnitsMenu } from '@shared/UnitsMenu'
import { GiCreditsCurrency } from 'react-icons/gi'
import { Menubar } from '../ui/menubar'

export function EncounterHeader() {
  const game = useGame()
  const credits = game.team.resources.credits ?? 0

  return (
    <PageHeader>
      <div className="flex flex-1 justify-between">
        <div className="flex flex-1 justify-start items-center">
          <Menubar className="border-0">
            <UnitsMenu units={game.units} />
            <ItemsMenu items={game.team.items} />
          </Menubar>
          <BeastiaryMenu />
        </div>

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
