import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useCombatContext } from '@/hooks'
import { useActions, useCombatUi } from '@/hooks/state'
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
  const actions = useActions()
  const { activeUnit, setActiveUnit } = useCombatUi()
  const modified = activeUnit ? applyModifiers(activeUnit, ctx).unit : undefined
  const [activeTab, setActiveTab] = useState('actions')
  const switchAction = new SwitchUnit(
    activeUnit?.id ?? '',
    activeUnit?.teamId ?? ''
  )

  function commitAction(action: Action, targetIds: Id[]) {
    actions.enqueue({
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

  if (!activeUnit || !modified) return null
  return (
    <Tabs
      value={activeTab}
      onValueChange={(tab) => setActiveTab(tab)}
      className="w-[580px]"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="actions">Actions</TabsTrigger>
        <TabsTrigger value="units" disabled={modified.flags.isLocked}>
          Units
        </TabsTrigger>
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
