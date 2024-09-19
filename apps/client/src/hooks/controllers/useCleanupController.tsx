import {
  getResultsFromActionItem,
  getTeamsWithSelectionRequired,
} from '@/utils'
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
          combat.setStatus('cleanup-running')
        }
      }

      if (status === 'cleanup-running') {
        const item = cleanup.dequeue(ctx)
        if (item) {
          const actionResults = getResultsFromActionItem(item, ctx)
          results.enqueue(...actionResults)
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
