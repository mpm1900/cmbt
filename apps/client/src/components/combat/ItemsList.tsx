import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import { Action, Id, Item, Unit } from '@repo/game/types'
import { useCombatContext } from '@/hooks'
import { ActionTargets } from './ActionTargets'
import { useCombatUi } from '@/hooks/state'
import { ActionRenderers } from '@/renderers'

export type ItemsListProps = {
  onConfirm: (action: Action, targetIds: Id[]) => void
}

export function ItemsList(props: ItemsListProps) {
  const { onConfirm } = props
  const unit = useCombatUi((u) => u.activeUnit)
  const ctx = useCombatContext()
  const team = ctx.teams.find((t) => t.id === unit?.teamId)
  const items = team?.items ?? []
  const [activeItem, setActiveItem] = useState<Item>()
  const [targets, setTargets] = useState<Unit[]>([])
  const renderer = ActionRenderers[activeItem?.id ?? '']

  function updateActiveItem(item: Item | undefined) {
    setActiveItem(item)
    if (item) {
      const possibleTargets = item.targets.resolve(ctx)
      if (possibleTargets.length <= item.maxTargetCount) {
        setTargets(possibleTargets)
      } else {
        setTargets([])
      }
    } else {
      setTargets([])
    }
  }

  function handleConfirm() {
    if (activeItem) {
      ;(activeItem as any).sourceId = targets[0].id
      onConfirm(
        activeItem,
        targets.map((t) => t.id)
      )
      setActiveItem(undefined)
      setTargets([])
    }
  }

  useEffect(() => {
    updateActiveItem(undefined)
  }, [unit?.id])

  useEffect(() => {
    if (targets.length === activeItem?.maxTargetCount) {
      handleConfirm()
    }
  }, [targets.length])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select an item to use...</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {items.map((item) => {
            const renderer = ActionRenderers[item.id]
            return (
              <Button
                key={item.rtid}
                className="items-start h-full flex-col"
                variant={item.id === activeItem?.id ? 'default' : 'secondary'}
                onClick={() =>
                  updateActiveItem(
                    item.id === activeItem?.id ? undefined : item
                  )
                }
              >
                <span className="text-lg text-ellipsis w-full overflow-hidden text-left">
                  {renderer?.name ?? item.id}
                </span>
                <span className="text-xs text-muted-foreground space-x-2">
                  x{item.count}
                </span>
              </Button>
            )
          })}
        </div>
        {items.length === 0 && (
          <div className=" text-center text-muted-foreground italic">
            No Items
          </div>
        )}
        {activeItem && (
          <Card className="dark:bg-muted/40 space-y-2">
            <CardContent className="p-4 pt-6">
              <div>
                <div>{renderer?.description(activeItem)}</div>
                {renderer?.help && (
                  <div className="text-sm text-muted-foreground/80 italic">
                    {renderer?.help(activeItem)}
                  </div>
                )}
              </div>
            </CardContent>
            <ActionTargets
              action={activeItem}
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
          </Card>
        )}
      </CardContent>
    </Card>
  )
}
