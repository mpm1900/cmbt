import { Team } from '@repo/game/types'

export type TeamHeaderProps = {
  team: Team | undefined
}

export function TeamHeader(props: TeamHeaderProps) {
  const { team } = props

  return (
    team && (
      <div className="p-2 border-b bg-slate-950 flex flex-row justify-end">
        <div className="">{team.resources.credits}g</div>
      </div>
    )
  )
}
