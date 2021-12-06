export class Post {
  // UUIDv4 of the post
  id: string;
  // UUIDv4 of the user who created the post
  userId: string;
  // The text content of the post
  content?: string;
  // The filename of the file belonging to the post
  filename?: string;
  // Date of creation
  createdAt: Date;
  // Date of last modification
  updatedAt: Date;
  // Number of upvotes on the post (virtual column)
  upvoteCount: number;
  // Number of downvotes on the post (virtual column)
  downvoteCount: number;
  // Number of comments on the post (virtual column)
  commentCount: number;
  // Has the current user upvoted the post (virtual column)
  hasUpvoted: boolean;
  // Has the current user downvoted the post (virtual column)
  hasDownvoted: boolean;
  // UUIDv4 of the user who owns the post (virtual column)
  ownerId: string;
  // Username of the user who owns the post (virtual column)
  ownerUsername: string;
  // Filename of the profile picture of the user who owns the post (virtual column)
  ownerFilename?: string;

  constructor(data: Post) {
    const { hasUpvoted, hasDownvoted, ...rest } = data;
    Object.assign(this, rest);
    // Workaround to convert 0 and 1 returned from the database into booleans
    this.hasUpvoted = !!(hasUpvoted as unknown);
    this.hasDownvoted = !!(hasDownvoted as unknown);
  }
}
