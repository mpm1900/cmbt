import { MODIFIER_NAMES, ModifierRenderer } from '.'
import { ModifierName } from './_helpers'

export const InvertSpeedAllRenderer: ModifierRenderer = {
  name: (mod) => <ModifierName>{MODIFIER_NAMES[mod.registryId]}</ModifierName>,
  description: (mod) => (
    <div>
      <div>Speed ×(-1)</div>
      <div className="text-xs opacity-60">
        (Units with higher speed stats will go last.)
      </div>
    </div>
  ),
}
