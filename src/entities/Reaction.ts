export enum ReactionType {
  Upvote = 1,
  Downvote = -1
}
const reaction1: ReactionType = 1; // this is correct
const reaction2: ReactionType = -1; // this is correct
const reaction3: ReactionType = -2;

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