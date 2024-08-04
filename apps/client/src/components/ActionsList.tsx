import { useActiveUiUnit } from '@/hooks/state'
import { ActionButton } from './ActionButton'
import { ActiveAction } from './ActiveAction'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { useEffect, useState } from 'react'
import { Action, Id, Unit } from '@repo/game/types'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarouselApi,
} from './ui/carousel'
import { cn } from '@/lib/utils'

export type ActionsListProps = {
  onConfirm: (action: Action, targetIds: Id[]) => void
}

export function ActionsList(props: ActionsListProps) {
  const { onConfirm } = props
  const unit = useActiveUiUnit((s) => s.unit)
  const [activeAction, setActiveAction] = useState<Action>()
  const [targets, setTargets] = useState<Unit[]>([])
  const carousel = useCarouselApi()

  function updateActiveAction(action: Action | undefined) {
    setActiveAction(action)
    setTargets([])
  }

  useEffect(() => {
    updateActiveAction(undefined)
  }, [unit?.id])

  function confirmActiveAction() {
    if (activeAction) {
      onConfirm(
        activeAction,
        targets.map((t) => t.id)
      )
      updateActiveAction(undefined)
    }
  }

  useEffect(() => {
    if (targets.length === activeAction?.maxTargetCount) {
      confirmActiveAction()
    }
  }, [targets.length])

  if (!unit) return null
  const pages = Math.ceil(unit.actions.length / 4)

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Select an Action for {unit.name}...</CardTitle>
        {carousel.count > 0 && (
          <div className="flex justify-end space-x-1" style={{ margin: 0 }}>
            {Array.from({ length: carousel.count }).map((_, i) => (
              <div
                key={i}
                onClick={() => carousel.api?.scrollTo(i)}
                className={cn('h-4 w-4 rounded-full border-4 cursor-pointer', {
                  'bg-slate-500 border-0': i === carousel.current - 1,
                })}
              ></div>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <Carousel setApi={carousel.setApi} opts={{ loop: true }}>
            <CarouselContent>
              {Array.from({ length: pages }).map((_, i) => (
                <CarouselItem key={i}>
                  <div className="grid grid-cols-2 gap-2">
                    {unit.actions
                      //
                      .slice(4 * i, 4 * i + 4)
                      .map((action) => (
                        <ActionButton
                          key={action.id}
                          source={unit}
                          action={action}
                          isActive={action.id === activeAction?.id}
                          onClick={() => {
                            updateActiveAction(action)
                          }}
                        />
                      ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        {activeAction && (
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
              confirmActiveAction()
            }}
          />
        )}
      </CardContent>
    </Card>
  )
}
