import { cn } from '@/lib/utils'
import { ActionRenderers } from '@/renderers'
import { ZERO_UNIT } from '@repo/game/data'
import { ActionMaker, Id } from '@repo/game/types'
import { useState } from 'react'
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
import { DamageIcon } from './DamageIcon'

export type ActionListTableProps = {
  actions: ActionMaker[]
  selectedActionIds: Id[]
  maxActionCount: number
  onSelect?: (maker: ActionMaker, isSelected: boolean) => void
}

export function ActionListTable(props: ActionListTableProps) {
  const { actions, selectedActionIds, maxActionCount, onSelect } = props
  const [hoverRow, setHoverRow] = useState<Id>()
  const list = [
    ...actions.filter((m) => selectedActionIds.includes(m.make(ZERO_UNIT).id)),
    ...actions.filter((m) => !selectedActionIds.includes(m.make(ZERO_UNIT).id)),
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {onSelect && <TableHead></TableHead>}
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
              onMouseEnter={() => setHoverRow(maker.id)}
              onMouseLeave={() => setHoverRow(undefined)}
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
  onMouseEnter: React.MouseEventHandler<HTMLTableRowElement>
  onMouseLeave: React.MouseEventHandler<HTMLTableRowElement>
  onSelect?: (maker: ActionMaker, isSelected: boolean) => void
}
function ActionListRow(props: ActionListRowProps) {
  const {
    maker,
    isDisabled,
    isSelected,
    onMouseEnter,
    onMouseLeave,
    onSelect,
  } = props
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
          if (onSelect && (isSelected || !isDisabled)) {
            onSelect(maker, !isSelected)
          }
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {onSelect && (
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
        )}
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
        <TableCell>
          {renderer.baseDamage && renderer.baseDamage(action) ? (
            <span className="inline-flex items-center space-x-1">
              <DamageIcon damageType={action.damage?.damageType} />
              <span>{renderer.baseDamage(action)}</span>
            </span>
          ) : (
            '—'
          )}
        </TableCell>
        <TableCell>{(renderer.cost && renderer.cost(action)) || '—'}</TableCell>
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
