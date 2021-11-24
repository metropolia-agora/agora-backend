import { Request, Response, NextFunction } from 'express';
import HttpStatusCodes from 'http-status-codes';
import { abilityService, postService } from '../services';
import { User } from '../entities';

class PostControllers {

  async createPost(req: Request, res: Response, next: NextFunction) {
    const { content }: { content: string } = req.body;
    try {
      abilityService.for(req.user).throwUnlessCan('create', 'Post');
      await postService.createPost(req.user as User, content);
      return res.status(HttpStatusCodes.OK).json({ ok: true });
    } catch (error) {
      return next(error);
    }
  }

}

export const postControllers = new PostControllers();
