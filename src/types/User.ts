// User types (anonymous, regular, moderator, and admin)
export enum UserType {
  anonymous,
  regular,
  moderator,
  admin,
}

// Unauthenticated anonymous user
export interface AnonymousUser {
  // User type (anonymous)
  type: UserType.anonymous;
}

// Authenticated user
export interface User {
  // UUIDv4 universally unique identifier
  id: string;
  // User type (regular, moderator, or admin)
  type: UserType.regular | UserType.moderator | UserType.admin,
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
}
