import { ChoiceButton } from '@/components/encounter/ChoiceButton'
import { Sidebar } from '@/components/encounter/Sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEncounterContext } from '@/hooks'
import { EncounterChoice } from '@repo/game/types'
import { Navbar } from '@shared/Navbar'
import { useState } from 'react'

export function Encounter() {
  const ctx = useEncounterContext()
  const [activeChoice, setActiveChoice] = useState<EncounterChoice>()

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-900 overflow-auto">
      <div className="flex flex-1 flex-row">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <Card className="max-w-[640px]">
            <CardHeader>
              <CardTitle>{ctx.activeNode.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>{ctx.activeNode.description}</div>
              <div className="space-x-2">
                {ctx.activeNode.choices.map((choice) => (
                  <ChoiceButton
                    key={choice.id}
                    choice={choice}
                    isActive={choice.id === activeChoice?.id}
                    setActiveChoice={setActiveChoice}
                  />
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
