import { EncounterNode } from '@repo/game/types'
import { nanoid } from 'nanoid'
import { GiVillage } from 'react-icons/gi'
import { CampEncounterActions } from './Actions'
import { CampEncounterTabs } from './Tabs'

export const CampEncounterCombatTrainingId = nanoid()
export const CampEncounterCombatTraining: EncounterNode = {
  id: CampEncounterCombatTrainingId,
  icon: <GiVillage />,
  title: 'Friendly Village - Combat Training',
  actions: (ctx) => CampEncounterActions(ctx),
  tabs: (ctx) => CampEncounterTabs(ctx),
}
