import { ZERO_UNIT } from '@repo/game/data'
import { UnitBuilder } from '@repo/game/types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { ActionRenderers } from '@/renderers'
import { Checkbox } from '../ui/checkbox'
import { useUnitBuilders } from '@/hooks/state/useUnitBuilders'
import { cn } from '@/lib/utils'
import { Badge } from '../ui/badge'
import { ActionHover } from '@shared/ActionHover'

export type ActionsTablePrpos = {
  builder: UnitBuilder
}

export function ActionsTable(props: ActionsTablePrpos) {
  const { builder } = props
  const store = useUnitBuilders()
  const list = [
    ...builder.config.actions.filter(
      (m) => !!builder.actions.find((a) => a.id === m.id)
    ),
    ...builder.config.actions.filter(
      (m) => !builder.actions.find((a) => a.id === m.id)
    ),
  ]
  return (
    <Table>
      <TableHeader>
        <TableHead></TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Type</TableHead>
        <TableHead>Accuracy</TableHead>
        <TableHead>Base Damage</TableHead>
        <TableHead>Cost</TableHead>
        <TableHead>Critical</TableHead>
      </TableHeader>
      <TableBody>
        {list.map((maker) => {
          const action = maker.make(ZERO_UNIT)
          const isSelected = !!builder.actions.find((m) => m.id === maker.id)
          const isDisbled =
            !isSelected &&
            builder.actions.length === builder.config.actionsCount
          const renderer = ActionRenderers[action.id]
          const accuracy = action.threshold(ZERO_UNIT)
          function handleChange(selected: boolean) {
            if (selected) {
              if (!isDisbled) {
                store.updateBuilder(builder.id, (b) => ({
                  actions: b.actions.concat(maker),
                }))
              }
            } else {
              store.updateBuilder(builder.id, (b) => ({
                actions: b.actions.filter((m) => m.id !== maker.id),
              }))
            }
          }
          return (
            <ActionHover key={action.id} action={action} side="right">
              <TableRow
                className={cn({
                  'bg-muted': isSelected,
                  'cursor-pointer': !isDisbled,
                })}
                onClick={() => {
                  handleChange(!isSelected)
                }}
              >
                <TableCell className="flex items-center">
                  <Checkbox
                    checked={isSelected}
                    disabled={isDisbled}
                    onCheckedChange={(e) => handleChange(!e)}
                  />
                </TableCell>
                <TableCell>{renderer.name}</TableCell>
                <TableCell>
                  {action.attackType ? (
                    <Badge
                      className={cn('border-none hover:text-white', {
                        'bg-blue-600 text-blue-200':
                          action.attackType === 'magic',
                        'bg-green-600 text-green-100':
                          action.attackType === 'physical',
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
                  {accuracy !== undefined ? `${accuracy}%` : '—'}
                </TableCell>
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
        })}
      </TableBody>
    </Table>
  )
}
