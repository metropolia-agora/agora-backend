export enum ReactionType {
  UpVote = 1,
  DownVote = -1
}

export class Reaction {
  userId: string;
  postId: string;
  type: ReactionType.UpVote | ReactionType.DownVote;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Reaction) {
    Object.assign(this, data);
  }
}
