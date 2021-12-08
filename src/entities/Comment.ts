export class Comment {
  // UUIDv4 of the comment
  id: string;
  // UUIDv4 of the post the comment belongs to
  postId: string;
  // UUIDv4 of the user who created the comment
  userId: string;
  // The text content of the comment
  content: string;
  // Date of creation
  createdAt: Date;
  // Date of last modification
  updatedAt: Date;
  // UUIDv4 of the user who owns the comment, alias for userId (virtual column)
  ownerId: string;
  // Username of the user who owns the comment (virtual column)
  ownerUsername: string;
  // Filename of the profile picture of the user who owns the comment (virtual column)
  ownerFilename?: string;

  constructor(data: Comment) {
    Object.assign(this, data);
  }
}
