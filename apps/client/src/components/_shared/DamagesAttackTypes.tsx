import { cn } from '@/lib/utils'
import { Damage } from '@repo/game/types'
import { getAttackTypesFromDamages } from '@repo/game/utils'
import { Badge } from '../ui/badge'

export type DamagesAttackTypesProps = {
  damages: Damage[]
}

export function DamagesAttackTypes(props: DamagesAttackTypesProps) {
  const { damages } = props
  const attackTypes = getAttackTypesFromDamages(damages)
  return (
    <div className="flex items-center">
      {damages.length > 0
        ? attackTypes.map((attackType) => (
            <Badge
              className={cn('border-none uppercase py-0 hover:text-white', {
                'bg-blue-600 text-blue-200': attackType === 'magic',
                'bg-green-600 text-green-100': attackType === 'physical',
              })}
              style={{ fontSize: '0.5rem' }}
              variant="outline"
            >
              {attackType}
            </Badge>
          ))
        : '—'}
    </div>
  )
}
