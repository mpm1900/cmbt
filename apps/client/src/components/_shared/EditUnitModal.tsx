import { Unit } from '@repo/game/types'
import { getUnitBase } from '@repo/game/utils'
import { PropsWithChildren } from 'react'
import { FaRegSquareFull, FaSquare } from 'react-icons/fa6'
import { TiTrash } from 'react-icons/ti'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Separator } from '../ui/separator'
import { ActionListTable } from './ActionListTable'
import { AugmentItemSelect } from './AugmentItemSelect'

export type EditUnitModalProps = PropsWithChildren<{
  unit: Unit
  onChange: (changes: Partial<Unit>) => void
}>

export function EditUnitModal(props: EditUnitModalProps) {
  const { children, unit, onChange } = props
  const { base, config } = getUnitBase(unit.baseId)
  const selectedActionIds = props.unit.actions.map((a) => a.id)
  const sum = unit.augments.reduce<number>((sum, a) => sum + (a.cost ?? 0), 0)

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="max-w-[920px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{unit.name}</DialogTitle>
          <DialogDescription>
            Change this unit's actions and augments for combat.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="flex space-x-4">
          {base && (
            <div className="min-w-[280px] space-y-4">
              <div>
                <div className="flex justify-between items-center">
                  <div className="font-bold">Items</div>
                  <div className="flex space-x-1 justify-center">
                    {Array.from({ length: base.augmentSlots }).map((_, i) =>
                      sum >= i + 1 ? (
                        <FaSquare key={i} className="fill-muted-foreground" />
                      ) : (
                        <FaRegSquareFull
                          key={i}
                          className="fill-muted-foreground"
                        />
                      )
                    )}
                  </div>
                </div>
                <div className="text-muted-foreground text-xs">
                  Select up to {base.augmentSlots} slots worth of items
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                {unit.augments.map((a, index) => (
                  <div key={a?.itemRtid} className="flex space-x-1">
                    <AugmentItemSelect
                      unit={unit}
                      value={a}
                      onChange={(augment) => {
                        if (augment) {
                          onChange({
                            augments: unit.augments.map((a, i) =>
                              i === index ? augment : a
                            ),
                          })
                        }
                      }}
                    />
                    <Button
                      variant="destructive"
                      className="p-2 opacity-60 hover:opacity-100"
                      onClick={() => {
                        onChange({
                          augments: unit.augments.filter((a, i) => i !== index),
                        })
                      }}
                    >
                      <TiTrash size={20} />
                    </Button>
                  </div>
                ))}
                {sum < base.augmentSlots && (
                  <AugmentItemSelect
                    unit={unit}
                    value={undefined}
                    onChange={(augment) => {
                      if (augment) {
                        onChange({
                          augments: [...unit.augments, augment],
                        })
                      }
                    }}
                  />
                )}
              </div>
            </div>
          )}
          <Separator orientation="vertical" />
          {config && (
            <div className="space-y-4 flex-1">
              <div>
                <div className="flex justify-between items-center">
                  <div className="font-bold">Actions</div>
                  <div className="flex space-x-1 justify-center">
                    {Array.from({ length: config.actionsCount }).map((_, i) =>
                      unit.actions.length >= i + 1 ? (
                        <FaSquare key={i} className="fill-muted-foreground" />
                      ) : (
                        <FaRegSquareFull
                          key={i}
                          className="fill-muted-foreground"
                        />
                      )
                    )}
                  </div>
                </div>
                <div className="text-muted-foreground text-xs">
                  Select up to {config.actionsCount} actions.
                </div>
              </div>
              <Separator />
              <ActionListTable
                actions={config.actions}
                maxActionCount={config.actionsCount}
                selectedActionIds={selectedActionIds}
                onSelect={(maker, isSelected) => {
                  if (isSelected) {
                    onChange({
                      actions: [...props.unit.actions, maker.make(props.unit)],
                    })
                  } else {
                    onChange({
                      actions: props.unit.actions.filter(
                        (a) => a.id !== maker.make(props.unit).id
                      ),
                    })
                  }
                }}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
