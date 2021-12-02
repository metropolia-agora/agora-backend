import { Router } from 'express';
import { feedControllers } from '../controllers';
import { query, validator } from '../middlewares';

// Router to handle requests to /api/feed
const feedRouter = Router();

// Get max 10 most recent post.
feedRouter.get(
  '/recent',
  validator([
    query('lastDate').isString(),
  ]),
  feedControllers.getRecent,
);

export { feedRouter };
