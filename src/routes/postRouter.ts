import { Router } from 'express';
import {body, FileTypes, upload, validator} from '../middlewares';
import { postControllers } from '../controllers';

// Router to handle requests to /api/posts
const postRouter = Router();

// Create a new post
postRouter.post(
  '/',
  validator([
    body('content').isString().optional(),
  ]),
  upload([FileTypes.image, FileTypes.audio, FileTypes.video]).single('file'),
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
