import { Button } from '@/components/ui/button'

export function Builder() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 overflow-auto">
      <div className="p-4">
        <Button>Initialize Combat</Button>
      </div>
    </div>
  )
}
