import { useEncounterContext } from '@/hooks'
import { EncounterNode, EncounterRenderProps } from '@repo/game/types'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'
import { ChoiceButton } from './ChoiceButton'
import { EncounterLogRenderer } from './EncounterLogRenderer'

export type NodeRendererProps = {
  node: EncounterNode
}

export function NodeRenderer(props: NodeRendererProps) {
  const { node } = props
  const ctx = useEncounterContext()
  const { Component, choices, Choice = ChoiceButton, footer, render } = node

  const nodeVisitCount = ctx.encounter.visitedNodeIds.filter(
    (id) => id === ctx.encounter.activeNodeId
  ).length
  const encounterVisitCount = ctx.visitedNodeIds.filter(
    (id) => id === ctx.encounter.id
  )!.length
  const renderProps: EncounterRenderProps = {
    nodeVisitCount,
    encounterVisitCount,
  }

  const tabs = node.tabs ? node.tabs(ctx, renderProps) : undefined
  const activeTab = tabs?.find((t) => t.active)?.id

  useEffect(() => {
    if (render) {
      render(ctx, renderProps)
    }
  }, [node.id])

  return (
    <Card className="w-[640px]">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex space-x-2">
            <div>{node.icon}</div>
            <div>{node.title}</div>
          </CardTitle>
          {node.actions && (
            <div className="flex">
              {node.actions(ctx, renderProps).map((tab) => (
                <Button
                  key={tab.id}
                  variant="ghost"
                  size="icon"
                  onClick={() => tab.resolve(ctx)}
                >
                  {tab.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 flex flex-col items-center">
          {tabs && (
            <Tabs value={activeTab}>
              <TabsList>
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    onClick={() => tab.resolve(ctx)}
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          )}
          <EncounterLogRenderer />
          {node.text && <div className="w-full">{node.text}</div>}
          {Component && (
            <motion.div
              className="w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Component ctx={ctx} {...renderProps} />
            </motion.div>
          )}
          {choices && (
            <div className="flex flex-col w-full">
              {choices(ctx, renderProps).map((choice, index) => (
                <Choice
                  key={choice.id}
                  choice={choice}
                  index={index}
                  ctx={ctx}
                />
              ))}
            </div>
          )}
          {footer && (
            <div className="flex w-full justify-end space-x-4">
              {footer(ctx, renderProps).map((choice) => (
                <Button
                  key={choice.id}
                  variant="secondary"
                  className="space-x-2"
                  onClick={() => choice.resolve(ctx)}
                >
                  {choice.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
