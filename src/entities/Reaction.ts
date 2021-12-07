export enum ReactionType {
  Upvote = 1,
  Downvote = -1
}

export class Reaction {
  // UUIDv4 of the post the reaction belongs to
  postId: string;
  // UUIDv4 of the user who created the reaction
  userId: string;
  // The type of the reaction
  type: ReactionType;
  // Date of creation
  createdAt: Date;
  // Date of last modification
  updatedAt: Date;

  constructor(data: Reaction) {
    Object.assign(this, data);
  }
}
