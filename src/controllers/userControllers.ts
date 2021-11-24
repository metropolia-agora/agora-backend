import { Request, Response, NextFunction } from 'express';
import HttpStatusCodes from 'http-status-codes';
import { abilityService, userService } from '../services';

class UserControllers {

  async authenticateUser(req: Request, res: Response, next: NextFunction) {
    const { username, password }: { username: string, password: string } = req.body;
    try {
      const user = await userService.authenticate(username, password);
      const token = await userService.generateToken(user);
      return res.status(HttpStatusCodes.OK).json({ ok: true, user, token });
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
      return res.status(HttpStatusCodes.CREATED).json({ ok: true, user, token });
    } catch (error) {
      return next(error);
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.params;
    try {
      const user = await userService.findUserById(userId);
      abilityService.for(req.user).throwUnlessCan('read', user);
      return res.status(HttpStatusCodes.OK).json({ ok: true, user });
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
      const updatedUser = await userService.findUserById(userId);
      return res.status(HttpStatusCodes.OK).json({ ok: true, user: updatedUser });
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
      const updatedUser = await userService.findUserById(userId);
      return res.status(HttpStatusCodes.OK).json({ ok: true, user: updatedUser });
    } catch (error) {
      return next(error);
    }
  }

  async updateUserPicture(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(HttpStatusCodes.NOT_IMPLEMENTED).json({ ok: true });
    } catch (error) {
      return next(error);
    }
  }

}

export const userControllers = new UserControllers();
