import { ALL_STATUSES } from '@repo/game/data'
import { Id, Modifier, Status } from '@repo/game/types'

export function getStatusesFromModifiers(modifiers: Modifier[]): Status[] {
  const statusModifiers = modifiers.filter((m) => m.statusId)
  const statusIds = Array.from(new Set(statusModifiers.map((m) => m.statusId)))
  const durations = statusModifiers.reduce<{ [key: Id]: number | undefined }>(
    (result, curr) => {
      return {
        ...result,
        [curr.statusId!]: curr.duration,
      }
    },
    {}
  )
  return statusIds
    .map((id) => ALL_STATUSES.find((s) => s.id === id))
    .filter((s) => s !== undefined)
    .map((status) => ({
      ...status,
      duration: durations[status.id] ?? status.duration,
    }))
}
