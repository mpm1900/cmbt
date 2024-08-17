import { Unit } from '@repo/game/types'
import { getUnitBase } from '@repo/game/utils'
import { PropsWithChildren } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { ActionListTable } from './ActionListTable'

export type EditUnitModalProps = PropsWithChildren<{
  unit: Unit
  onChange: (changes: Partial<Unit>) => void
}>

export function EditUnitModal(props: EditUnitModalProps) {
  const { children, unit, onChange } = props
  const { base, config } = getUnitBase(unit.baseId)
  const selectedActionIds = props.unit.actions.map((a) => a.id)

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="min-w-[600px]">
        <DialogHeader>
          <DialogTitle>{unit.name}</DialogTitle>
          <DialogDescription>
            Change this units actions for combat.
          </DialogDescription>
        </DialogHeader>
        <div>
          <ActionListTable
            actions={config.actions}
            maxActionCount={config.actionsCount}
            selectedActionIds={selectedActionIds}
            onSelect={(maker, isSelected) => {
              console.log('select')
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
      </DialogContent>
    </Dialog>
  )
}
