import { useCombatContext } from '@/hooks'
import { cn } from '@/lib/utils'
import { PropsWithClassname } from '@/types'
import { GetUnits } from '@repo/game/data'
import { Id } from '@repo/game/types'
import { motion } from 'framer-motion'
import { TeamBench } from './TeamBench'
import { UnitCard } from './UnitCard'

export type TeamProps = PropsWithClassname<{
  teamId: Id | undefined
  reverse?: boolean
}>

export function Team(props: TeamProps) {
  const { className, teamId, reverse } = props
  const ctx = useCombatContext()
  const units = new GetUnits({
    teamId,
    isActive: true,
  }).resolve(ctx)

  return (
    <div
      className={cn('flex flex-col justify-end', className, {
        'flex-col-reverse': reverse,
      })}
    >
      <TeamBench
        teamId={teamId}
        className={cn('justify-end', {
          'justify-start': reverse,
        })}
      />
      <div
        className={cn('flex flex-1 items-start justify-end space-x-4 p-4', {
          'justify-start items-end': reverse,
        })}
      >
        {units.map((unit) => (
          <motion.div
            key={unit.id}
            className="text-left flex flex-1 max-w-[400px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.1 }}
          >
            <UnitCard
              unit={unit}
              isEnemy={teamId !== ctx.user}
              reverse={reverse}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
