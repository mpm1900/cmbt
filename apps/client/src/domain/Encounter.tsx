import { Sidebar } from '@/components/encounter/Sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useEncounterContext } from '@/hooks'
import { EncounterChoice } from '@repo/game/types'
import { Link } from '@tanstack/react-router'
import { useState } from 'react'

export function Encounter() {
  const ctx = useEncounterContext()
  const [activeChoice, setActiveChoice] = useState<EncounterChoice>()

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-900 overflow-auto">
      <div className="flex flex-1 flex-row">
        <div className="w-[64px] h-screen bg-slate-950 py-2 flex justify-center">
          <Link to="/">
            <Button className="p-1">Restart</Button>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <Card>
            <CardHeader>{ctx.activeNode.description}</CardHeader>
            <CardContent>
              <div className="space-x-2">
                {ctx.activeNode.choices.map((choice) => (
                  <Button
                    key={choice.id}
                    variant={
                      choice.id === activeChoice?.id ? 'default' : 'secondary'
                    }
                    onClick={() => {
                      if (choice.resolve) {
                        choice.resolve(ctx)
                        setActiveChoice(undefined)
                      } else {
                        setActiveChoice(choice)
                      }
                    }}
                  >
                    {choice.label}
                  </Button>
                ))}
              </div>
              {activeChoice && (
                <div>
                  {activeChoice.options.map((option) => (
                    <Button key={option.id} onClick={() => option.resolve(ctx)}>
                      {option.label}
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <Sidebar />
      </div>
    </div>
  )
}
