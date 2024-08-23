import { useCombatContext } from '@/hooks'
import { useCombat, useCombatUi } from '@/hooks/state'
import { ActionRenderers } from '@/renderers'
import { groupItemsById } from '@/utils'
import { Action, Id, Item, Unit } from '@repo/game/types'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { ActiveAction } from './ActiveAction'

export type ItemsListProps = {
  onConfirm: (action: Action, targetIds: Id[]) => void
}

export function ItemsList(props: ItemsListProps) {
  const { onConfirm } = props
  const unit = useCombatUi((u) => u.activeUnit)
  const combat = useCombat()
  const ctx = useCombatContext()
  const team = ctx.teams.find((t) => t.id === unit?.teamId)
  const items = groupItemsById(team?.items ?? [])
  const [activeItem, setActiveItem] = useState<Item>()
  const activeAction =
    unit && activeItem?.action ? activeItem?.action(unit) : undefined
  const [targets, setTargets] = useState<Unit[]>([])

  function updateActiveItem(item: Item | undefined) {
    setActiveItem(item)
    if (item && unit && item.action) {
      const action = item.action(unit)
      const possibleTargets = action.targets.resolve(ctx)
      if (possibleTargets.length <= action.maxTargetCount) {
        setTargets(possibleTargets)
      } else {
        setTargets([])
      }
    } else {
      setTargets([])
    }
  }

  function handleConfirm() {
    if (activeItem && unit && activeItem.action) {
      const action = activeItem.action(unit)
      combat.removeItemsWhwere(ctx.user, (i) => i.rtid === activeItem.rtid)
      onConfirm(
        action,
        targets.map((t) => t.id)
      )
      setActiveItem(undefined)
      setTargets([])
    }
  }

  useEffect(() => {
    updateActiveItem(undefined)
  }, [unit?.id])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select an item to use...</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {unit && (
          <div className="grid grid-cols-2 gap-2">
            {items.map((item) => {
              if (!item.action) return null
              const action = item.action(unit)
              const renderer = ActionRenderers[action.id]
              return (
                <Button
                  key={action.id}
                  className="items-start h-full flex-col"
                  disabled={item.count <= 0}
                  variant={
                    action.id === activeAction?.id ? 'default' : 'secondary'
                  }
                  onClick={() =>
                    updateActiveItem(
                      item.id === activeItem?.id ? undefined : item
                    )
                  }
                >
                  <span className="text-lg text-ellipsis w-full overflow-hidden text-left">
                    {renderer?.name ?? action.id}
                  </span>
                  <span className="text-xs text-muted-foreground space-x-2">
                    {item.count}
                  </span>
                </Button>
              )
            })}
          </div>
        )}
        {items.length === 0 && (
          <div className=" text-center text-muted-foreground italic">
            No Items
          </div>
        )}
        {activeAction && unit && (
          <ActiveAction
            action={activeAction}
            source={unit}
            targets={targets}
            onTargetClick={(target, isSelected) => {
              setTargets((s) =>
                isSelected
                  ? s.filter((t) => t.id !== target.id)
                  : s.concat(target)
              )
            }}
            onConfirmClick={() => {
              handleConfirm()
            }}
          />
        )}
      </CardContent>
    </Card>
  )
}
