import { EncounterRenderProps } from '@repo/game/types'
import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useEncounter } from './state/useEncounter'
import { useEncounterContext } from './useEncounterContext'

export function useEncounterSetup() {
  const store = useEncounter()
  const ctx = useEncounterContext()
  const nav = useNavigate()
  const [ready, setReady] = useState(false)

  const nodeVisitCount = ctx.encounter.visitedNodeIds.filter(
    (id) => id === ctx.encounter.activeNodeId
  ).length
  const encounterVisitCount = ctx.visitedNodeIds.filter(
    (id) => id === ctx.encounter.id
  )!.length
  const renderProps: EncounterRenderProps = {
    nodeVisitCount,
    encounterVisitCount,
  }

  useEffect(() => {
    if (!store.encounter.id) {
      nav({ to: '/' })
    } else {
      store.encounter.setup(ctx, renderProps)
      setReady(true)
    }
  }, [])

  return ready
}
