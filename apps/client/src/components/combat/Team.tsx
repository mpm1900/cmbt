import { PropsWithClassname } from '@/types'
import { TeamBench } from './TeamBench'
import { useCombatContext } from '@/hooks'
import { UnitCard } from './UnitCard'
import { Id } from '@repo/game/types'
import { cn } from '@/lib/utils'
import { GetUnits } from '@repo/game/data'
import { motion } from 'framer-motion'

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
        className={cn('flex flex-1 items-start justify-end', {
          'justify-start': reverse,
        })}
      >
        {units.map((unit) => (
          <motion.div
            key={unit.id}
            className="text-left p-4 px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.1 }}
          >
            <UnitCard
              unit={unit}
              hideStats={teamId !== ctx.user}
              reverse={reverse}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
