import { useItems } from '@/hooks/state/useItems'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { useState } from 'react'
import { Item, Unit } from '@repo/game/types'
import { useGameContext } from '@/hooks'

export function ItemsList() {
  const { items } = useItems()
  const ctx = useGameContext()
  const [activeItem, setActiveItem] = useState<Item>()
  const [targets, setTargets] = useState<Unit[]>([])

  function updateActiveItem(item: Item | undefined) {
    setActiveItem(item)
    if (item) {
      const possibleTargets = ctx.units.filter((unit) =>
        item.targets(unit, ctx)
      )
      if (possibleTargets.length <= item.maxTargetCount) {
        setTargets(possibleTargets)
      } else {
        setTargets([])
      }
    } else {
      setTargets([])
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select an item to use...</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {items.map((item) => (
            <Button
              key={item.rtid}
              className="items-start h-full flex-col"
              variant={item.id === activeItem?.id ? 'default' : 'secondary'}
              onClick={() =>
                updateActiveItem(item.id === activeItem?.id ? undefined : item)
              }
            >
              <span className="text-lg text-ellipsis w-full overflow-hidden">
                {item.id}
              </span>
              <span className="text-xs text-muted-foreground space-x-2">
                x{item.count}
              </span>
            </Button>
          ))}
        </div>
        {activeItem && (
          <Card className="dark:bg-muted/40 space-y-2">
            <CardContent className="p-4 pt-6">test</CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}
