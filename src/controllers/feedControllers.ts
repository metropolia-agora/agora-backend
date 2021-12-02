import { Request, Response, NextFunction } from 'express';
import HttpStatusCodes from 'http-status-codes';
import { abilityService, postService } from '../services';

class FeedControllers {

  // Gets 10 most recent posts sorted by lastDate query.
  async getRecent(req: Request, res: Response, next: NextFunction) {
    const lastDate = new Date(req.query.lastDate as string);
    try {
      abilityService.for(req.user).throwUnlessCan('read', 'Post');
      const posts = await postService.findRecentPosts(lastDate);
      return res.status(HttpStatusCodes.OK).json({ ok: true, posts });
    } catch (error) {
      return next(error);
    }
  }

}

export const feedControllers = new FeedControllers();
