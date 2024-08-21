import { useEncounterContext } from '@/hooks'
import { EncounterNode } from '@repo/game/types'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'
import { ChoiceButton } from './ChoiceButton'

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
        <div>{node.text}</div>
        <Separator />
        {node.renderChoices ? (
          node.renderChoices(ctx)
        ) : (
          <div className="flex flex-col">
            {node
              .choices(ctx)
              .map((choice, index) =>
                ctx.activeNode.renderChoice ? (
                  ctx.activeNode.renderChoice(choice, index, ctx)
                ) : (
                  <ChoiceButton
                    key={choice.id}
                    choice={choice}
                    index={index + 1}
                  />
                )
              )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
