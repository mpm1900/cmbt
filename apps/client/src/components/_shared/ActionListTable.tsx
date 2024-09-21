import { cn } from '@/lib/utils'
import { ActionRenderers } from '@/renderers'
import { BASE_UNIT, ZERO_UNIT } from '@repo/game/data'
import { ActionMaker, Id, Unit } from '@repo/game/types'
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
import { DamageListInline } from './DamageListInline'
import { DamagesAttackTypes } from './DamagesAttackTypes'

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
          <TableHead>Lv</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Power</TableHead>
          <TableHead>Acc</TableHead>
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
        <TableCell>{maker.level ? `Lv.${maker.level}` : '—'}</TableCell>
        <TableCell>{renderer.name}</TableCell>
        <TableCell>
          {action.damages.length > 0 ? (
            <DamagesAttackTypes damages={action.damages} />
          ) : (
            '—'
          )}
        </TableCell>

        <TableCell className="num">
          {action.damages.length > 0 ? (
            <span className="inline-flex items-center space-x-1">
              <DamageListInline
                className="space-x-2"
                damages={action.damages}
                children=""
                conjunction=""
                seporator=""
              />
            </span>
          ) : (
            '—'
          )}
        </TableCell>
        <TableCell className="num">
          {accuracy !== undefined ? `${accuracy}%` : '—'}
        </TableCell>
        <TableCell>{(renderer.cost && renderer.cost(action)) || '—'}</TableCell>
        {action.criticalFactor(ZERO_UNIT) ? (
          <TableCell className="num">
            {action.criticalThreshold(ZERO_UNIT)}%{', '}
            {action.criticalFactor(ZERO_UNIT)}x
          </TableCell>
        ) : (
          <TableCell>—</TableCell>
        )}
      </TableRow>
    </ActionHover>
  )
}
