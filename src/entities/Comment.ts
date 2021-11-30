export class Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Comment) {
    Object.assign(this, data);
  }
}