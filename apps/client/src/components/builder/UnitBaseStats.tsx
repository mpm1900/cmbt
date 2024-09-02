import { StatRenderers } from '@/renderers/Stats'
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
      <div className="flex items-center space-x-2">
        <div className="h-[24px] w-[24px]">{StatRenderers.health?.icon}</div>
        <Label className="w-[100px]">Health</Label>
        <StatBar ratio={base.stats.health / 255} />
      </div>
      <div className="flex items-center space-x-2">
        <div className="h-[24px] w-[24px]">{StatRenderers.attack?.icon} </div>
        <Label className="w-[100px]">Attack</Label>
        <StatBar ratio={base.stats.attack / 255} />
      </div>
      <div className="flex items-center space-x-2">
        <div className="h-[24px] w-[24px]">{StatRenderers.defense?.icon}</div>
        <Label className="w-[100px]">Defense</Label>
        <StatBar ratio={base.stats.defense / 255} />
      </div>
      <div className="flex items-center space-x-2">
        <div className="h-[24px] w-[24px]">{StatRenderers.magic?.icon}</div>
        <Label className="w-[100px]">Magic</Label>
        <StatBar ratio={base.stats.magic / 255} />
      </div>
      <div className="flex items-center space-x-2">
        <div className="h-[24px] w-[24px]">{StatRenderers.speed?.icon}</div>
        <Label className="w-[100px]">Speed</Label>
        <StatBar ratio={base.stats.speed / 255} />
      </div>
    </div>
  )
}
