import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useGame } from './state'

export function useWorldSetup() {
  const game = useGame()
  const nav = useNavigate()

  useEffect(() => {
    if (!game.team.id) {
      nav({ to: '/' })
    }
  }, [])
}
