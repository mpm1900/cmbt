import { AugmentRenderers } from '@/renderers'
import { ZERO_UNIT } from '@repo/game/data'
import { Augment } from '@repo/game/types'
import { ModifierDescription } from './ModifierDescription'

export type AugmentDescriptionProps = {
  augment: Augment
}

export function AugmentDescription(props: AugmentDescriptionProps) {
  const { augment } = props
  const renderer = AugmentRenderers[augment.id]

  return (
    <div className="text-muted-foreground space-y-1">
      {renderer.description && renderer.description()}
      {augment.modifiers(ZERO_UNIT).map((modifier) => (
        <ModifierDescription modifier={modifier} />
      ))}
    </div>
  )
}
