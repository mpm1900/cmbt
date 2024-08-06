import { useActions, useCombatSettings } from '@/hooks/state'
import { Switch } from '../ui/switch'
import { Label } from '../ui/label'
import { Slider } from '../ui/slider'

export function CombatSettings() {
  const settings = useCombatSettings()
  const queue = useActions()
  return (
    <div className="py-2 px-4 space-y-4">
      <div className="flex items-center space-x-2">
        <Label htmlFor="debug-mode">Debug Mode</Label>
        <Switch
          id="debug-mode"
          checked={settings.isDebugMode}
          onCheckedChange={(e) => {
            settings.setIsDebugMode(e)
            queue.setQueue(() => [])
          }}
        />
      </div>
      <div className="flex items-center space-x-2 whitespace-nowrap">
        <Label htmlFor="debug-mode">Game Speed</Label>
        <Slider
          value={[settings.gameSpeed]}
          onValueChange={(e) => settings.setGameSpeed(e[0])}
          max={2000}
          step={1}
        />
      </div>
    </div>
  )
}
