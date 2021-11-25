import { Router } from 'express';
import { body, validator } from '../middlewares';
import { postControllers } from '../controllers';

// Router to handle requests to /api/posts
const postRouter = Router();

// Create a new post
postRouter.post(
  '/',
  validator([
    body('content').isString(),
  ]),
  postControllers.createPost,
);


// Get post
postRouter.get(
  '/:postId',
  postControllers.getPost,
);

// Delete post
postRouter.delete(
  '/:postId',
  postControllers.deletePost);

export { postRouter };
