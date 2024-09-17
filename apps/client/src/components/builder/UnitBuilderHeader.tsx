import { useUnitBuilders } from '@/hooks/state'
import { useBuilderUi } from '@/hooks/state/useBuilderUi'
import { useState } from 'react'
import { MdEdit } from 'react-icons/md'
import { CardDescription, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Toggle } from '../ui/toggle'

export function UnitBuilderHeader() {
  const ui = useBuilderUi()
  const store = useUnitBuilders()
  const builder = store.builders.find((b) => b.id === ui.activeBuilderId)
  const [showNameEdit, setShowNameEdit] = useState(false)
  if (!builder) return null

  return (
    <div className="flex space-x-2">
      {showNameEdit ? (
        <Input
          className="flex-1"
          value={builder.name}
          onChange={(e) => {
            const name = e.target.value
            if (name) {
              store.updateBuilder(builder.id, (b) => ({
                name,
              }))
            }
          }}
        />
      ) : (
        <div className="flex-1">
          <CardTitle>{builder.name}</CardTitle>
          <CardDescription>Set unit details</CardDescription>
        </div>
      )}

      <Toggle onClick={() => setShowNameEdit((v) => !v)}>
        <MdEdit />
      </Toggle>
    </div>
  )
}
