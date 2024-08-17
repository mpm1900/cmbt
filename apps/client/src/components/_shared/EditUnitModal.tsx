import { GLOBAL_ACTIONS, ZERO_UNIT } from '@repo/game/data'
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
}>

const GLOBAL_ACTION_IDS = GLOBAL_ACTIONS.map((m) => m.make(ZERO_UNIT).id)

export function EditUnitModal(props: EditUnitModalProps) {
  const { children, unit } = props
  const { base, config } = getUnitBase(unit.baseId)
  const selectedActionIds = unit.actions
    .filter((a) => !GLOBAL_ACTION_IDS.includes(a.id))
    .map((a) => a.id)

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
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
