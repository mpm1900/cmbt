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
      <div className="border-b bg-slate-950 flex flex-row justify-between">
        <div className="w-[64px] bg-black p-2 text-center font-mono text-muted-foreground border-r">
          cmbt
        </div>
        <div className="flex items-center space-x-1 px-4">
          <Counter from={team.resources.credits} to={credits} duration={0.5} />
          <GiCreditsCurrency />
        </div>
      </div>
    )
  )
}
