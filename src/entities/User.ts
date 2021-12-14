// User types (anonymous, regular and moderator)
export enum UserType {
  anonymous,
  regular,
  moderator,
}

export class AnonymousUser {
  // UUIDv4 of the user (always undefined)
  id: undefined;
  // User type (always anonymous)
  type: UserType.anonymous;

  constructor() {
    this.type = UserType.anonymous;
  }
}

export class User {
  // UUIDv4 of the user
  id: string;
  // User type (regular or moderator)
  type: UserType.regular | UserType.moderator;
  // Unique username
  username: string;
  // Hashed password
  password: string;
  // The filename of the profile picture
  filename?: string | null;
  // Date of creation
  createdAt: Date;
  // Date of last modification
  updatedAt: Date;

  constructor(data: User) {
    Object.assign(this, data);
  }
}
