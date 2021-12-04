export class Post {
  id: string;
  userId: string;
  content?: string;
  filename?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Post) {
    Object.assign(this, data);
  }
}
