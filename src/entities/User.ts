// User types (anonymous, regular, moderator, and admin)
export enum UserType {
  anonymous,
  regular,
  moderator,
  admin,
}

export class AnonymousUser {
  // User type (anonymous)
  type: UserType.anonymous;

  constructor() {
    this.type = UserType.anonymous;
  }
}

export class User {
  // UUIDv4 universally unique identifier
  id: string;
  // User type (regular, moderator, or admin)
  type: UserType.regular | UserType.moderator | UserType.admin;
  // Unique username
  username: string;
  // Hashed password
  password: string;
  // Optional filename of the profile picture
  pictureFilename?: string;
  // Date of creation
  createdAt: Date;
  // Date of last modification
  updatedAt: Date;

  constructor(data: User) {
    Object.assign(this, data);
  }
}
