import { useBuilderUi } from '@/hooks/state/useBuilderUi'
import { useUnitBuilders } from '@/hooks/state/useUnitBuilders'
import { UnitBaseImmunities } from '@shared/UnitBaseImmunities'
import { UnitBaseStats } from '@shared/UnitBaseStats'
import { FaRegSquareFull, FaSquare } from 'react-icons/fa6'
import { UnitBaseAffinities } from '../_shared/UnitBaseAffinities'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Separator } from '../ui/separator'
import { ActionsTable } from './ActionsTable'
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

              <UnitBaseAffinities base={builder.base} />
              <UnitBaseImmunities base={builder.base} />
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
                  Select up to {builder.base.stats.memory} actions.
                </CardDescription>
              </div>
              <div className="flex space-x-1 justify-center">
                {Array.from({ length: builder.base.stats.memory }).map(
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
