import { useBuilderUi } from '@/hooks/state/useBuilderUi'
import { useUnitBuilders } from '@/hooks/state/useUnitBuilders'
import { FaRegSquareFull, FaSquare } from 'react-icons/fa6'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Separator } from '../ui/separator'
import { ActionsTable } from './ActionsTable'
import { UnitBaseStats } from './UnitBaseStats'
import { UnitBuilderAffinities } from './UnitBuilderAffinities'
import { UnitBuilderHeader } from './UnitBuilderHeader'
import { UnitBuilderSelects } from './UnitBuilderSelects'

export function UnitBuilder() {
  const ui = useBuilderUi()
  const store = useUnitBuilders()
  const builder = store.builders.find((b) => b.id === ui.activeBuilderId)

  return (
    <div className="flex space-y-4 lg:space-y-0 lg:space-x-4 items-start justify-center flex-col lg:flex-row">
      {builder && (
        <Card className="w-full lg:w-[360px]">
          <CardHeader>
            <UnitBuilderHeader />
          </CardHeader>

          <CardContent>
            <div className="space-y-2">
              <UnitBuilderSelects />
              <Separator />
              <UnitBaseStats base={builder.base} />
              <Separator />
              <UnitBuilderAffinities />
            </div>
          </CardContent>
        </Card>
      )}
      {builder && (
        <Card className="w-full lg:w-[680px]">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Actions</CardTitle>
                <CardDescription>
                  Select up to {builder.config.actionsCount} actions.
                </CardDescription>
              </div>
              <div className="flex space-x-1 justify-center">
                {Array.from({ length: builder.config.actionsCount }).map(
                  (_, i) =>
                    builder.actions.length >= i + 1 ? (
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
          </CardHeader>
          <CardContent>
            <ActionsTable builder={builder} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
