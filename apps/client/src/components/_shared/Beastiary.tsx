import { UnitBaseRenderers } from '@/renderers/UnitBases'
import { ALL_BASES } from '@repo/game/data'
import { UnitBase } from '@repo/game/types'
import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'
import { UnitBaseAffinities } from './UnitBaseAffinities'
import { UnitBaseStats } from './UnitBaseStats'

export function Beastiary() {
  const [base, set] = useState<UnitBase>(ALL_BASES[0])
  return (
    <div className="overflow-auto max-h-full flex-1 flex">
      <Tabs
        orientation="vertical"
        onValueChange={(value) => {
          const b = ALL_BASES.find((u) => u.id === value)!
          set(b)
        }}
      >
        <TabsList className="flex flex-col h-full items-start justify-start text-left min-w-[200px]">
          {ALL_BASES.map((base) => (
            <TabsTrigger
              key={base.id}
              value={base.id}
              className="w-full justify-start"
            >
              {base.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      {base && (
        <div>
          <div className="text-xl p-4">{base.name}</div>
          <div className="flex-1 flex">
            <div className="p-4 pt-0 space-y-2 min-w-[320px]">
              <UnitBaseStats base={base} />
              <UnitBaseAffinities base={base} />
            </div>
            <div className="p-4 pt-0 space-y-4">
              <div>{UnitBaseRenderers[base.id]?.description()}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
