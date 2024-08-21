import { Team } from '@repo/game/types'
import { GiCreditsCurrency } from 'react-icons/gi'
import { Counter } from './Counter'

export type TeamHeaderProps = {
  team: Team | undefined
}

export function TeamHeader(props: TeamHeaderProps) {
  const { team } = props
  const credits = team?.resources.credits ?? 0

  return (
    team && (
      <div className="p-2 border-b bg-slate-950 flex flex-row justify-end">
        <div className="flex items-center space-x-1">
          <Counter from={team.resources.credits} to={credits} duration={0.5} />
          <GiCreditsCurrency />
        </div>
      </div>
    )
  )
}
