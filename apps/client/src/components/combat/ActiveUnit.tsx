import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useCombatActions, useCombatContext } from '@/hooks'
import { useCombatUi } from '@/hooks/state'
import { SwitchUnit } from '@repo/game/data'
import { Action, Id } from '@repo/game/types'
import { applyModifiers } from '@repo/game/utils'
import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'
import { ActionsList } from './ActionsList'
import { ItemsList } from './ItemsList'
import { SwitchUnits } from './SwitchUnits'

export type ActiveUnitProps = {}

export function ActiveUnit() {
  const ctx = useCombatContext()
  const { pushAction } = useCombatActions()
  const { activeUnit, setActiveUnit } = useCombatUi()
  const [activeTab, setActiveTab] = useState('actions')
  const switchAction = new SwitchUnit(
    activeUnit?.id ?? '',
    activeUnit?.teamId ?? ''
  )

  function commitAction(action: Action, targetIds: Id[]) {
    pushAction({
      id: nanoid(),
      action,
      targetIds,
    })

    setActiveUnit(
      ctx.units.find(
        (u) =>
          u.teamId === activeUnit?.teamId &&
          u.id !== activeUnit.id &&
          u.flags.isActive
      )
    )
  }

  useEffect(() => {
    setActiveTab('actions')
  }, [activeUnit?.id])

  useEffect(() => {
    if (ctx.turn.status === 'main') {
      const unit = ctx.units
        .filter((u) => u.flags.isActive && u.teamId === ctx.user)
        .map((u) => applyModifiers(u, ctx).unit)
        .find((u) => !u.flags.isStunned)

      setActiveUnit(ctx.units.find((u) => u.id === unit?.id))
    }
  }, [ctx.turn.status])

  if (!activeUnit) return null
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
          unit={activeUnit}
          onConfirm={(action, targetIds) => commitAction(action, targetIds)}
        />
      </TabsContent>
      <TabsContent value="units">
        <SwitchUnits
          action={switchAction}
          onConfirm={(targets) => {
            commitAction(
              switchAction,
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
