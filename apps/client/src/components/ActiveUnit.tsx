import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import { SwitchUnit } from '@repo/game/data'
import { Action, Id } from '@repo/game/types'
import { applyModifiers } from '@repo/game/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SwitchUnits } from './SwitchUnits'
import { ItemsList } from './ItemsList'
import { useGameActions, useGameContext } from '@/hooks'
import { useActiveUiUnit, useTeams, useTurn } from '@/hooks/state'
import { ActionsList } from './ActionsList'
import { ActiveUnitSwitchUnits } from './ActiveUnitSwitchUnits'

export type ActiveUnitProps = {}

export function ActiveUnit() {
  const ctx = useGameContext()
  const { pushAction } = useGameActions()
  const { turn } = useTurn()
  const { user } = useTeams()
  const { unit, setUnit } = useActiveUiUnit()
  const [activeTab, setActiveTab] = useState('actions')

  function commitAction(action: Action, targetIds: Id[]) {
    if (action) {
      pushAction({
        id: nanoid(),
        action,
        targetIds,
      })

      setUnit(
        ctx.units.find(
          (u) =>
            u.teamId === unit?.teamId && u.id !== unit.id && u.flags.isActive
        )
      )
    }
  }

  useEffect(() => {
    setActiveTab('actions')
  }, [unit?.id])

  useEffect(() => {
    if (turn.status === 'waiting-for-input') {
      const unit = ctx.units
        .filter((u) => u.flags.isActive && u.teamId === user)
        .map((u) => applyModifiers(u, ctx).unit)
        .find((u) => !u.flags.isRecharging)

      setUnit(ctx.units.find((u) => u.id === unit?.id))
    }
  }, [turn.status])

  if (!unit) return null
  return (
    <Tabs
      value={activeTab}
      onValueChange={(tab) => setActiveTab(tab)}
      className="w-[580px]"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="actions">Actions</TabsTrigger>
        <TabsTrigger value="units">Units</TabsTrigger>
        <TabsTrigger value="items">Items</TabsTrigger>
      </TabsList>
      <TabsContent value="actions">
        <ActionsList
          onConfirm={(action, targetIds) => commitAction(action, targetIds)}
        />
      </TabsContent>
      <TabsContent value="units">
        <ActiveUnitSwitchUnits
          unit={unit}
          onConfirm={(targets) => {
            commitAction(
              new SwitchUnit(unit.id, unit.teamId),
              targets.map((t) => t.id)
            )
          }}
        />
      </TabsContent>
      <TabsContent value="items">
        <ItemsList
          onConfirm={(action, targetIds) => commitAction(action, targetIds)}
        />
      </TabsContent>
    </Tabs>
  )
}
