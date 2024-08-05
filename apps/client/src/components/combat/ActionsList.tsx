import { useActiveUiUnit } from '@/hooks/state'
import { ActionButton } from './ActionButton'
import { ActiveAction } from './ActiveAction'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { useEffect, useState } from 'react'
import { Action, Id, Unit } from '@repo/game/types'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarouselApi,
} from '../ui/carousel'
import { cn } from '@/lib/utils'

export type ActionsListProps = {
  unit: Unit
  onConfirm: (action: Action, targetIds: Id[]) => void
}

export function ActionsList(props: ActionsListProps) {
  const { unit, onConfirm } = props
  const [selectedAction, setSelectedAction] = useState<Action>()
  const [selectedTargets, setSelectedTargets] = useState<Unit[]>([])
  const carousel = useCarouselApi()

  function updateActiveAction(action: Action | undefined) {
    setSelectedAction(action)
    setSelectedTargets([])
  }

  useEffect(() => {
    updateActiveAction(undefined)
  }, [unit?.id])

  function handleConfirm() {
    if (selectedAction) {
      onConfirm(
        selectedAction,
        selectedTargets.map((t) => t.id)
      )
      updateActiveAction(undefined)
    }
  }

  useEffect(() => {
    if (selectedTargets.length === selectedAction?.maxTargetCount) {
      handleConfirm()
    }
  }, [selectedTargets.length])

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
                          isActive={action.id === selectedAction?.id}
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
        {selectedAction && (
          <ActiveAction
            action={selectedAction}
            source={unit}
            targets={selectedTargets}
            onTargetClick={(target, isSelected) => {
              setSelectedTargets((s) =>
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
