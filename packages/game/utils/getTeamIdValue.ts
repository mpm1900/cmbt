import { Id } from '../types'

export function getTeamIdValue(
  id: Id,
  teamId: Id | undefined,
  notTeamId: Id | undefined
) {
  if (teamId !== undefined) return id === teamId
  if (notTeamId !== undefined) return id !== notTeamId
  return false
}
