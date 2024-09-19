import {
  CombatContext,
  Id,
  Modifier,
  MODIFIER_PRIORITIES,
  ModifierProps,
  MutationFilterArgs,
  Unit,
} from '../../types'
import { getTeamIdValue } from '../../utils'
import { AddModifiersToRegistryAllId } from '../Ids'

export class AddModifiersToRegistryTeam extends Modifier {
  teamId?: Id
  notTeamId?: Id
  modifiers: Modifier[]

  constructor(
    props: ModifierProps<{ teamId?: Id; notTeamId?: Id; modifiers: Modifier[] }>
  ) {
    super(AddModifiersToRegistryAllId, props)
    this.priority = MODIFIER_PRIORITIES.IMMUNITIES
    this.teamId = props.teamId
    this.notTeamId = props.notTeamId
    this.modifiers = props.modifiers
  }

  resolve = (unit: Unit): Partial<Unit> => {
    const modifierIdsToAdd = this.modifiers
      .filter((mod) => !unit.registry.modifiers.includes(mod.registryId))
      .map((mod) => mod.registryId)
    return {
      registry: {
        ...unit.registry,
        modifiers: [...unit.registry.modifiers, ...modifierIdsToAdd],
      },
    }
  }

  filter = (
    unit: Unit,
    ctx: CombatContext,
    args: MutationFilterArgs
  ): boolean => {
    return (
      super.filter(unit, ctx, args) &&
      unit.flags.isActive &&
      getTeamIdValue(unit.teamId, this.teamId, this.notTeamId)
    )
  }
}
