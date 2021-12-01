import { Router } from 'express';
import { feedControllers } from '../controllers';

// Router to handle requests to /api/feed
const feedRouter = Router();

feedRouter.get(
  '/recent',
  feedControllers.getRecent,
);

export { feedRouter };
