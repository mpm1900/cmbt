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
  const { Component, choices, Choice = ChoiceButton } = node

  return (
    <Card className="w-[640px]">
      <CardHeader>
        <CardTitle>{node.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>{node.text}</div>
        <Separator />
        {Component && <Component ctx={ctx} />}
        {choices && (
          <div className="flex flex-col">
            {choices(ctx).map((choice, index) => (
              <Choice key={choice.id} choice={choice} index={index} ctx={ctx} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
