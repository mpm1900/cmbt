import { cn } from '@/lib/utils'
import { ActionRenderers } from '@/renderers'
import { ZERO_UNIT } from '@repo/game/data'
import { ActionMaker, Id } from '@repo/game/types'
import { Badge } from '../ui/badge'
import { Checkbox } from '../ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { ActionHover } from './ActionHover'

export type ActionListTableProps = {
  actions: ActionMaker[]
  selectedActionIds: Id[]
  maxActionCount: number
  onSelect: (maker: ActionMaker, isSelected: boolean) => void
}

export function ActionListTable(props: ActionListTableProps) {
  const { actions, selectedActionIds, maxActionCount, onSelect } = props
  const list = [
    ...actions.filter((m) => selectedActionIds.includes(m.make(ZERO_UNIT).id)),
    ...actions.filter((m) => !selectedActionIds.includes(m.make(ZERO_UNIT).id)),
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Accuracy</TableHead>
          <TableHead>Base Damage</TableHead>
          <TableHead>Cost</TableHead>
          <TableHead>Critical</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map((maker) => {
          const action = maker.make(ZERO_UNIT)
          const isSelected = !!selectedActionIds.includes(action.id)
          const isDisabled =
            !isSelected && selectedActionIds.length >= maxActionCount
          return (
            <ActionListRow
              key={maker.id}
              maker={maker}
              isSelected={isSelected}
              isDisabled={isDisabled}
              onSelect={onSelect}
            />
          )
        })}
      </TableBody>
    </Table>
  )
}

type ActionListRowProps = {
  maker: ActionMaker
  isSelected: boolean
  isDisabled: boolean
  onSelect: (maker: ActionMaker, isSelected: boolean) => void
}
function ActionListRow(props: ActionListRowProps) {
  const { maker, isDisabled, isSelected, onSelect } = props
  const action = maker.make(ZERO_UNIT)
  const renderer = ActionRenderers[action.id]
  const accuracy = action.threshold(ZERO_UNIT)

  return (
    <ActionHover action={action} side="right">
      <TableRow
        className={cn({
          'bg-muted': isSelected,
          'cursor-pointer': !isDisabled,
        })}
        onClick={() => {
          console.log(isSelected, isDisabled)
          if (isSelected || !isDisabled) {
            onSelect(maker, !isSelected)
          }
        }}
      >
        <TableCell className="flex items-center">
          <Checkbox
            checked={isSelected}
            disabled={isDisabled}
            onCheckedChange={(e) => {
              if (!e || !isDisabled) {
                onSelect(maker, !e)
              }
            }}
          />
        </TableCell>
        <TableCell>{renderer.name}</TableCell>
        <TableCell>
          {action.attackType ? (
            <Badge
              className={cn('border-none hover:text-white', {
                'bg-blue-600 text-blue-200': action.attackType === 'magic',
                'bg-green-600 text-green-100': action.attackType === 'physical',
              })}
              variant="outline"
            >
              {action.attackType}
            </Badge>
          ) : (
            '—'
          )}
        </TableCell>
        <TableCell>{accuracy !== undefined ? `${accuracy}%` : '—'}</TableCell>
        <TableCell>{renderer.baseDamage(action) || '—'}</TableCell>
        <TableCell>{renderer.cost || '—'}</TableCell>
        {action.criticalFactor(ZERO_UNIT) ? (
          <TableCell>
            {action.criticalThreshold(ZERO_UNIT)}% x
            {action.criticalFactor(ZERO_UNIT)}
          </TableCell>
        ) : (
          <TableCell>—</TableCell>
        )}
      </TableRow>
    </ActionHover>
  )
}
