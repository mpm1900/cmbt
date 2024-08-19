import { ALL_STATUSES } from '@repo/game/data'
import { Modifier, Status } from '@repo/game/types'

export function getStatusesFromModifiers(modifiers: Modifier[]): Status[] {
  const statusIds = Array.from(
    new Set(modifiers.filter((m) => m.statusId).map((m) => m.statusId))
  )
  return statusIds
    .map((id) => ALL_STATUSES.find((s) => s.id === id))
    .filter((s) => s !== undefined)
}
