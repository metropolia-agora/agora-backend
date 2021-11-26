import { Ability, AbilityBuilder, AbilityClass } from '@casl/ability';
import { AnonymousUser, User, UserType, Post } from '../entities';
import { ForbiddenException } from '../exceptions';

// Define allowed actions and valid subjects
type Action = 'create' | 'read' | 'update' | 'delete';
type Subject = 'User' | User | 'Post' | Post;

// Define type for Ability class
const AppAbility = Ability as AbilityClass<Ability<[Action, Subject]>>;

class AbilityService {

  // Define the abilities a user has
  private static defineAbilityFor(user: User | AnonymousUser) {
    const { can, build } = new AbilityBuilder(AppAbility);

    // USER MANAGEMENT
    switch (user.type) {
      case UserType.anonymous:
        can('read', 'User');
        can('create', 'User');
        break;
      case UserType.regular:
        can('read', 'User');
        can(['update', 'delete'], 'User', { id: { $eq: user.id } });
        break;
      case UserType.moderator:
        can('read', 'User');
        can(['update', 'delete'], 'User', { id: { $eq: user.id } });
        can('delete', 'User', { type: { $ne: UserType.moderator } });
        break;
    }

    // POST MANAGEMENT
    switch (user.type) {
      case UserType.anonymous:
        can('read', 'Post');
        break;
      case UserType.regular:
        can(['create', 'read'], 'Post');
        can(['update', 'delete'], 'Post', { userId: { $eq: user.id } });
        break;
      case UserType.moderator:
        can(['create', 'read', 'delete'], 'Post');
        can('update', 'Post', { userId: { $eq: user.id } });
        break;
    }

    return build();
  }

  // Check if the user can perform the action on the subject
  // (and optionally, field) or throw a ForbiddenException.
  for(user: User | AnonymousUser) {
    return {
      throwUnlessCan: (action: Action, subject: Subject, field?: string) => {
        const ability = AbilityService.defineAbilityFor(user);
        if (ability.cannot(action, subject, field)) {
          const subjectName = typeof subject === 'object' ? subject.constructor.name : String(subject);
          throw new ForbiddenException(`You cannot ${action} ${subjectName}.`);
        }
      },
    };
  }

}

export const abilityService = new AbilityService();
