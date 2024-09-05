import { Team } from '@repo/game/types'
import { GiCreditsCurrency } from 'react-icons/gi'
import { Counter } from './Counter'
import { PageHeader } from './PageHeader'

export type TeamHeaderProps = {
  team: Team | undefined
}

export function TeamHeader(props: TeamHeaderProps) {
  const { team } = props
  const credits = team?.resources.credits ?? 0

  return (
    team && (
      <PageHeader className="justify-between">
        <div className="flex items-center space-x-1 px-4">
          <Counter from={team.resources.credits} to={credits} duration={0.5} />
          <GiCreditsCurrency />
        </div>
      </PageHeader>
    )
  )
}
