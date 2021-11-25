import { Request, Response, NextFunction } from 'express';
import HttpStatusCodes from 'http-status-codes';
import { abilityService, postService } from '../services';
import { User } from '../entities';

class PostControllers {

  async createPost(req: Request, res: Response, next: NextFunction) {
    const { content }: { content?: string } = req.body;
    const file = req?.file;
    try {
      abilityService.for(req.user).throwUnlessCan('create', 'Post');
      await postService.createPost(req.user as User, content, file);
      return res.status(HttpStatusCodes.OK).json({ ok: true });
    } catch (error) {
      return next(error);
    }
  }

  async getPost(req: Request, res: Response, next: NextFunction) {
    const { postId } = req.params;
    try {
      const post = await postService.findPostById(postId);
      abilityService.for(req.user).throwUnlessCan('read', post);
      return res.status(HttpStatusCodes.OK).json({ ok: true, post });
    } catch (error) {
      return next(error);
    }
  }

  async deletePost(req: Request, res: Response, next: NextFunction) {
    const { postId } = req.params;
    try {
      const post = await postService.findPostById(postId);
      abilityService.for(req.user).throwUnlessCan('delete', post);
      await postService.deletePost(postId);
      return res.status(HttpStatusCodes.OK).json({ ok: true, post});
    } catch (error) {
      return next(error);
    }
  }

}

export const postControllers = new PostControllers();
