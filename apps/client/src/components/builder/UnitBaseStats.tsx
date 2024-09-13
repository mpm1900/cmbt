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
        <StatBar ratio={base.stats.health / 255}>{base.stats.health}</StatBar>
      </div>
      <div className="flex items-center space-x-2">
        <div className="h-[24px] w-[24px]">{StatRenderers.attack?.icon} </div>
        <Label className="w-[100px]">Attack</Label>
        <StatBar ratio={base.stats.attack / 255}>{base.stats.attack}</StatBar>
      </div>
      <div className="flex items-center space-x-2">
        <div className="h-[24px] w-[24px]">{StatRenderers.defense?.icon}</div>
        <Label className="w-[100px]">Defense</Label>
        <StatBar ratio={base.stats.defense / 255}>{base.stats.defense}</StatBar>
      </div>
      <div className="flex items-center space-x-2">
        <div className="h-[24px] w-[24px]">{StatRenderers.magic?.icon}</div>
        <Label className="w-[100px]">Magic</Label>
        <StatBar ratio={base.stats.magic / 255}>{base.stats.magic}</StatBar>
      </div>
      <div className="flex items-center space-x-2">
        <div className="h-[24px] w-[24px]">{StatRenderers.speed?.icon}</div>
        <Label className="w-[100px]">Speed</Label>
        <StatBar ratio={base.stats.speed / 255}>{base.stats.speed}</StatBar>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <div className="pr-2">
          Total:{' '}
          {base.stats.health +
            base.stats.attack +
            base.stats.defense +
            base.stats.magic +
            base.stats.speed}
        </div>
      </div>
    </div>
  )
}
