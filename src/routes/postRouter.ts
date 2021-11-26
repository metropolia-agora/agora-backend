import { Router } from 'express';
import { body, FileTypes, param, upload, validator } from '../middlewares';
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


// Get post by id
postRouter.get(
  '/:postId',
  validator([
    param('postId').isUUID(4),
  ]),
  postControllers.getPost,
);

// Delete post
postRouter.delete(
  '/:postId',
  validator([
    param('postId').isUUID(4),
  ]),
  postControllers.deletePost);

export { postRouter };
