import { EncounterNode } from '@repo/game/types'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { ChoiceButton } from './ChoiceButton'
import { useEncounterContext } from '@/hooks'

export type NodeRendererProps = {
  node: EncounterNode
}

export function NodeRenderer(props: NodeRendererProps) {
  const { node } = props
  const ctx = useEncounterContext()

  return (
    <Card className="w-[640px]">
      <CardHeader>
        <CardTitle>{node.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>{node.description}</div>
        {node.renderChoices ? (
          node.renderChoices(ctx)
        ) : (
          <div className="space-x-2 flex justify-center">
            {node
              .choices(ctx)
              .map((choice, index) =>
                ctx.activeNode.renderChoice ? (
                  ctx.activeNode.renderChoice(choice, index, ctx)
                ) : (
                  <ChoiceButton key={choice.id} choice={choice} />
                )
              )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
