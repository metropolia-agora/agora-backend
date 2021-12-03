import { Request, Response, NextFunction } from 'express';
import HttpStatusCodes from 'http-status-codes';
import { abilityService, commentService, postService, reactionService } from '../services';
import { Reaction, ReactionType, User } from '../entities';

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
      const comments = await commentService.findAllCommentsOfPost(postId);
      abilityService.for(req.user).throwUnlessCan('read', post);
      abilityService.for(req.user).throwUnlessCan('read', 'Comment');
      return res.status(HttpStatusCodes.OK).json({ ok: true, post, comments });
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
      await postService.findPostById(postId);
      abilityService.for(req.user).throwUnlessCan('create', 'Comment');
      await commentService.createComment(postId, req.user as User, content);
      return res.status(HttpStatusCodes.CREATED).json({ ok: true });
    } catch (error) {
      return next(error);
    }
  }

  async deleteComment(req: Request, res: Response, next: NextFunction) {
    const { commentId } = req.params;
    try {
      const comment = await commentService.findCommentById(commentId);
      abilityService.for(req.user).throwUnlessCan('delete', comment);
      await commentService.deleteComment(commentId);
      return res.status(HttpStatusCodes.OK).json({ ok: true, comment });
    } catch (error) {
      return next(error);
    }
  }

  // REACTION ENDPOINTS

  async createReaction(req: Request, res: Response, next: NextFunction) {
    const { type }: { type: ReactionType } = req.body;
    const { postId } = req.params;
    try {
      await postService.findPostById(postId);
      abilityService.for(req.user).throwUnlessCan('create', 'Reaction');
      await reactionService.createReaction(postId, req.user as User, type);
      return res.status(HttpStatusCodes.CREATED).json({ ok: true });
    } catch (error) {
      return next(error);
    }
  }

  // Delete Reaction
  async deleteReaction(req: Request, res: Response, next: NextFunction) {
    const { postId } = req.params;
    const { userId } = req.params;
    try {
      await reactionService.findReaction(postId, userId);
      abilityService.for(req.user).throwUnlessCan('delete', 'Reaction' );
      await reactionService.deleteReaction(postId, userId);
      return res.status(HttpStatusCodes.OK).json({ ok: true });
    } catch (error) {
      return next(error);
    }
  }
}

export const postControllers = new PostControllers();
