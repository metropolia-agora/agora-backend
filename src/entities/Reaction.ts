export enum ReactionType {
  Upvote = 1,
  Downvote = -1
}


export class Reaction {
  userId: string;
  postId: string;
  type: ReactionType.Upvote | ReactionType.Downvote;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Reaction) {
    Object.assign(this, data);
  }
}