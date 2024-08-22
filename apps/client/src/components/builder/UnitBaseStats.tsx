import { UnitBase } from '@repo/game/types'
import { Label } from '../ui/label'
import { StatBar } from './StatBar'

export type UnitBaseStatsProps = {
  base: UnitBase
}

export function UnitBaseStats(props: UnitBaseStatsProps) {
  const { base } = props
  return (
    <div className="space-y-1">
      <div className="flex items-center">
        <Label className="w-[120px]">Health</Label>
        <StatBar ratio={base.stats.health / 255} />
      </div>
      <div className="flex items-center">
        <Label className="w-[120px]">Physical</Label>
        <StatBar ratio={base.stats.physical / 255} />
      </div>
      <div className="flex items-center">
        <Label className="w-[120px]">Defense</Label>
        <StatBar ratio={base.stats.defense / 255} />
      </div>
      <div className="flex items-center">
        <Label className="w-[120px]">Magic</Label>
        <StatBar ratio={base.stats.magic / 255} />
      </div>
      <div className="flex items-center">
        <Label className="w-[120px]">Speed</Label>
        <StatBar ratio={base.stats.speed / 255} />
      </div>
      {/*<div className="flex items-center">
        <div className="text-left">
          {base.stats.health +
            base.stats.physical +
            base.stats.defense +
            base.stats.magic +
            base.stats.speed}
        </div>
      </div>*/}
    </div>
  )
}
