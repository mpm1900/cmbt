import { cn } from '@/lib/utils'
import { ActionRenderers } from '@/renderers'
import { BASE_UNIT, ZERO_UNIT } from '@repo/game/data'
import { ActionMaker, Id, Unit } from '@repo/game/types'
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
import { DamageInline } from './DamageInline'

export type ActionListTableProps = {
  unit?: Unit
  makers: ActionMaker[]
  selectedActionIds: Id[]
  maxActionCount: number
  onSelect?: (maker: ActionMaker, isSelected: boolean) => void
}

export function ActionListTable(props: ActionListTableProps) {
  const {
    makers,
    selectedActionIds,
    maxActionCount,
    unit = BASE_UNIT,
    onSelect,
  } = props
  const list = [
    ...makers.filter((m) => selectedActionIds.includes(m.id)),
    ...makers.filter((m) => !selectedActionIds.includes(m.id)),
  ].filter((maker) => !maker.level || maker.level <= unit.level)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {onSelect && <TableHead></TableHead>}
          <TableHead>Name</TableHead>
          <TableHead>Req</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Base Damage</TableHead>
          <TableHead>Accuracy</TableHead>
          <TableHead>Cost</TableHead>
          <TableHead>Critical</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map((maker) => {
          const action = maker.make(unit)
          const isSelected = !!selectedActionIds.includes(action.id)
          const isDisabled =
            !isSelected && selectedActionIds.length >= maxActionCount
          return (
            <ActionListRow
              key={maker.id}
              maker={maker}
              unit={unit}
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
  unit: Unit
  isSelected: boolean
  isDisabled: boolean
  onSelect?: (maker: ActionMaker, isSelected: boolean) => void
}
function ActionListRow(props: ActionListRowProps) {
  const { maker, unit, isDisabled, isSelected, onSelect } = props
  const action = maker.make(unit)
  const renderer = ActionRenderers[action.id]
  const accuracy = action.threshold(unit)

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
        <TableCell>{maker.level ? `Lv.${maker.level}` : '—'}</TableCell>
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

        <TableCell>
          {renderer.baseDamage && renderer.baseDamage(action) ? (
            <span className="inline-flex items-center space-x-1">
              <DamageInline damage={action.damage} children="" />
            </span>
          ) : (
            '—'
          )}
        </TableCell>
        <TableCell>{accuracy !== undefined ? `${accuracy}%` : '—'}</TableCell>
        <TableCell>{(renderer.cost && renderer.cost(action)) || '—'}</TableCell>
        {action.criticalFactor(ZERO_UNIT) ? (
          <TableCell>
            {action.criticalThreshold(ZERO_UNIT)}%{', '}x
            {action.criticalFactor(ZERO_UNIT)}
          </TableCell>
        ) : (
          <TableCell>—</TableCell>
        )}
      </TableRow>
    </ActionHover>
  )
}
