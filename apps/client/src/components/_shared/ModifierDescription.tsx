import { ModifierRenderers } from '@/renderers'
import { Modifier } from '@repo/game/types'

export type ModifierDescriptionProps = {
  modifier: Modifier
}

export function ModifierDescription(props: ModifierDescriptionProps) {
  const { modifier } = props
  const renderer =
    ModifierRenderers[modifier.registryId] || ModifierRenderers[modifier.id]

  return (
    <div className="text-muted-foreground">
      {renderer?.description && renderer.description(modifier)}
    </div>
  )
}
