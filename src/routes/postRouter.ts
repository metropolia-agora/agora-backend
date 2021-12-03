import { Router } from 'express';
import { body, FileTypes, fileUpload, param, validator } from '../middlewares';
import { postControllers } from '../controllers';
import { ReactionType } from '../entities';

// Router to handle requests to /api/posts
const postRouter = Router();

// Create a new post
postRouter.post(
  '/',
  validator([
    body('content').isString().optional(),
  ]),
  fileUpload([FileTypes.image, FileTypes.audio, FileTypes.video]).single('file'),
  postControllers.createPost,
);

// Get a post
postRouter.get(
  '/',
  validator([
    param('postId').isUUID(4),
  ]),
  postControllers.getPost,
);

// Delete a post
postRouter.delete(
  '/:postId',
  validator([
    param('postId').isUUID(4),
  ]),
  postControllers.deletePost,
);

// Create a new comment
postRouter.post(
  '/:postId/comments',
  validator([
    param('postId').isUUID(4),
    body('content').isString(),
  ]),
  postControllers.createComment,
);

// Delete a comment
postRouter.delete(
  '/:postId/comments/:commentId',
  validator([
    param('postId').isUUID(4),
    param('commentId').isUUID(4),
  ]),
  postControllers.deleteComment,
);

// Create a new reaction
postRouter.post(
  '/:postId/reactions/:userId',
  validator([
    param('postId').isUUID(4),
    body('type').isIn([ReactionType.Upvote, ReactionType.Downvote]),
  ]),
  postControllers.createReaction,
);

// Delete Reaction
postRouter.delete(
  '/:postId/reactions/:userId',
  validator([
    param('postId').isUUID(4),
    param('userId').isUUID(4),
  ]),
  postControllers.deleteReaction,
);

export { postRouter };
