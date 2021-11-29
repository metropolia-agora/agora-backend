import { Request, Response, NextFunction } from 'express';
import HttpStatusCodes from 'http-status-codes';
import { abilityService, commentService, postService } from '../services';
import { User } from '../entities';

class PostControllers {

  async createPost(req: Request, res: Response, next: NextFunction) {
    const { content }: { content?: string } = req.body;
    const file = req?.file;
    try {
      abilityService.for(req.user).throwUnlessCan('create', 'Post');
      await postService.createPost(req.user as User, content, file);
      return res.status(HttpStatusCodes.CREATED).json({ ok: true });
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
      return res.status(HttpStatusCodes.OK).json({ ok: true, post });
    } catch (error) {
      return next(error);
    }
  }

  // COMMENT ENDPOINTS

  async createComment(req: Request, res: Response, next: NextFunction) {
    const { content }: { content: string } = req.body;
    const { postId } = req.params;
    try {
      const post = await postService.findPostById(postId);
      if (!post) {
        return res.status(HttpStatusCodes.NOT_FOUND).json({ ok: false });
      } else {
        abilityService.for(req.user).throwUnlessCan('create', 'Comment');
        await commentService.createComment(postId, req.user as User, content);
        return res.status(HttpStatusCodes.CREATED).json({ ok: true });
      }
    } catch (error) {
      return next(error);
    }
  }

  async deleteComment(req: Request, res: Response, next: NextFunction) {
    const { commentId } = req.params;
    console.log('postController, deleteComment, commentID:', commentId);
    try {
      const comment = await commentService.findCommentById(commentId);
      abilityService.for(req.user).throwUnlessCan('delete', comment);
      await commentService.deleteComment(commentId);
      return res.status(HttpStatusCodes.OK).json({ ok: true, comment });
    } catch (error) {
      return next(error);
    }
  }
}

export const postControllers = new PostControllers();
