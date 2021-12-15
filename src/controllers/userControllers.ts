import { Request, Response, NextFunction } from 'express';
import HttpStatusCodes from 'http-status-codes';
import { abilityService, postService, userService } from '../services';

class UserControllers {

  async authenticateUser(req: Request, res: Response, next: NextFunction) {
    const { username, password }: { username: string, password: string } = req.body;
    try {
      const user = await userService.authenticate(username, password);
      const token = await userService.generateToken(user);
      const sanitizedUser = userService.getSanitizedUserData(user);
      return res.status(HttpStatusCodes.OK).json({ ok: true, user: sanitizedUser, token });
    } catch (error) {
      return next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    const { username, password }: { username: string, password: string } = req.body;
    try {
      abilityService.for(req.user).throwUnlessCan('create', 'User');
      await userService.createUser(username, password);
      const user = await userService.findUserByUsername(username);
      const token = await userService.generateToken(user);
      const sanitizedUser = userService.getSanitizedUserData(user);
      return res.status(HttpStatusCodes.CREATED).json({ ok: true, user: sanitizedUser, token });
    } catch (error) {
      return next(error);
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;
    try {
      const user = await userService.findUserById(userId);
      abilityService.for(req.user).throwUnlessCan('read', user);
      const sanitizedUser = userService.getSanitizedUserData(user);
      return res.status(HttpStatusCodes.OK).json({ ok: true, user: sanitizedUser });
    } catch (error) {
      return next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;
    const { password }: { password: string } = req.body;
    try {
      const user = await userService.findUserById(userId);
      abilityService.for(req.user).throwUnlessCan('delete', user);
      await userService.deleteUser(user, password);
      return res.status(HttpStatusCodes.OK).json({ ok: true });
    } catch (error) {
      return next(error);
    }
  }

  async updateUserUsername(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;
    const { username }: { username: string } = req.body;
    try {
      const user = await userService.findUserById(userId);
      abilityService.for(req.user).throwUnlessCan('update', user);
      await userService.updateUsername(user, username);
      const updatedUser = await userService.findUserById(user.id);
      const sanitizedUser = userService.getSanitizedUserData(updatedUser);
      return res.status(HttpStatusCodes.OK).json({ ok: true, user: sanitizedUser });
    } catch (error) {
      return next(error);
    }
  }

  async updateUserPassword(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;
    const { newPassword, currentPassword }: { newPassword: string, currentPassword: string } = req.body;
    try {
      const user = await userService.findUserById(userId);
      abilityService.for(req.user).throwUnlessCan('update', user);
      await userService.updatePassword(user, newPassword, currentPassword);
      const updatedUser = await userService.findUserById(user.id);
      const sanitizedUser = userService.getSanitizedUserData(updatedUser);
      return res.status(HttpStatusCodes.OK).json({ ok: true, user: sanitizedUser });
    } catch (error) {
      return next(error);
    }
  }

  async updateUserPicture(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;
    const newPicture = req.file;
    try {
      const user = await userService.findUserById(userId);
      abilityService.for(req.user).throwUnlessCan('update', user);
      await userService.updatePicture(user, newPicture);
      const updatedUser = await userService.findUserById(userId);
      const sanitizedUser = userService.getSanitizedUserData(updatedUser);
      return res.status(HttpStatusCodes.OK).json({ ok: true, user: sanitizedUser });
    } catch (error) {
      return next(error);
    }
  }

  async getUserPosts(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;
    try {
      const user = await userService.findUserById(userId);
      const posts = await postService.findPostsByUserId(user.id, req.user.id);
      abilityService.for(req.user).throwUnlessCan('read', 'Post');
      return res.status(HttpStatusCodes.OK).json({ ok: true, posts });
    } catch (error) {
      return next(error);
    }
  }

}

export const userControllers = new UserControllers();
