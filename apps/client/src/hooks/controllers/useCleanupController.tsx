import {
  getResultsFromActionItem,
  getTeamsWithSelectionRequired,
} from '@/utils'
import { SetIsActive, SetIsActiveId } from '@repo/game/data'
import { nanoid } from 'nanoid'
import { useEffect } from 'react'
import { useActions, useCleanup, useCombat } from '../state'
import { useResults } from '../state/useResults'
import { useCombatContext } from '../useCombatContext'

export function useCleanupController() {
  const actions = useActions()
  const cleanup = useCleanup()
  const combat = useCombat()
  const results = useResults()
  const ctx = useCombatContext()

  const status = combat.turn.status
  const teams = getTeamsWithSelectionRequired(combat.teams, ctx)

  useEffect(() => {
    if (status === 'cleanup' || status === 'cleanup-running') {
      if (status === 'cleanup') {
        if (cleanup.queue.length === teams.length) {
          if (cleanup.queue.every((i) => i.action.id === SetIsActiveId)) {
            const hasTargets =
              cleanup.queue.flatMap((i) => i.targetIds).length > 0
            if (hasTargets) {
              cleanup.setQueue((items) => [
                {
                  id: nanoid(),
                  action: new SetIsActive('', 0),
                  targetIds: items.flatMap((i) => i.targetIds),
                },
              ])
            }
          }
          combat.setStatus('cleanup-running')
        }
      }

      if (status === 'cleanup-running') {
        const item = cleanup.first(ctx)
        if (item) {
          const actionResults = getResultsFromActionItem(item, ctx)
          results.enqueue(...actionResults)
          cleanup.remove((i) => i.id === item.id)
        } else {
          if (results.queue.length === 0) {
            if (actions.queue.length === 0) {
              combat.setStatus('end')
            } else {
              combat.setStatus('combat')
            }
          }
        }
      }
    }
  }, [status, cleanup.queue.length, results.queue.length, teams.length])
}
