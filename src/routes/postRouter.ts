import { Router } from 'express';
import { body, FileTypes, param, upload, validator } from '../middlewares';
import { postControllers } from '../controllers';
import { ReactionType } from '../entities/Reaction';


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


// Create a new Reaction
postRouter.post(
  '/api/posts/:postId/reactions/:userId',
  validator([
    body('type').isIn([ReactionType.UpVote, ReactionType.DownVote]),
  ]),
  postControllers.createReaction,
);

export { postRouter };
