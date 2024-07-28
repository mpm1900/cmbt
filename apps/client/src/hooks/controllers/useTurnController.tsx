import { isUnitAliveCtx } from '@repo/game/utils'
import { useEffect } from 'react'
import { useActions, useCleanup, useTurn } from '../state'
import { useGameActions } from '../useGameActions'
import { useGameContext } from '../useGameContext'
import { getTeamsWithSelectionRequired } from '@/utils/getTeamsWithSelectionRequired'
import { commitNextActionItem } from '@/utils'
import { LogHeader } from '@/components/ui/log'

export function useTurnController() {
  const { turn, setStatus, next } = useTurn()
  const actions = useActions()
  const cleanup = useCleanup()
  const fns = useGameActions()
  const ctx = useGameContext()

  function nextTurn() {
    ctx.modifiers = fns.decrementModifierDurations()
    fns.runTriggers('onTurnEnd', ctx)
    next()
    ctx.log(<LogHeader>turn {turn.count + 1}</LogHeader>)
    setStatus('idle')
  }

  function handleCleanup() {
    const aliveTeams = ctx.teams.filter((team) =>
      ctx.units.some((u) => u.teamId === team.id && isUnitAliveCtx(u.id, ctx))
    )

    if (aliveTeams.length !== 2) {
      setStatus('done')
    } else {
      const cleanupTeams = getTeamsWithSelectionRequired(ctx)
      if (cleanupTeams.length === 0) {
        nextTurn()
      } else {
        setStatus('cleanup')
      }
    }
  }

  useEffect(() => {
    if (turn.status === 'running') {
      commitNextActionItem(
        turn.status,
        actions,
        ctx,
        fns.commitResult,
        handleCleanup
      )
    }
  }, [turn.status, actions.queue.length])

  useEffect(() => {
    if (turn.status === 'cleanup') {
      commitNextActionItem(
        turn.status,
        cleanup,
        ctx,
        fns.commitResult,
        handleCleanup
      )
    }
  }, [turn.status, cleanup.queue.length])
}
