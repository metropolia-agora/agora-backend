import { Request, Response, NextFunction } from 'express';
import HttpStatusCodes from 'http-status-codes';
import { UserService } from '../services';

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password }: { username: string, password: string } = req.body;
  try {
    const user = await UserService.authenticate(username, password);
    const token = await UserService.generateToken(user);
    return res.status(HttpStatusCodes.OK).json({ ok: true, user, token });
  } catch (error) {
    return next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password }: { username: string, password: string } = req.body;
  try {
    await UserService.createUser(username, password);
    const user = await UserService.findUserByUsername(username);
    const token = await UserService.generateToken(user);
    return res.status(HttpStatusCodes.CREATED).json({ ok: true, user, token });
  } catch (error) {
    return next(error);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(HttpStatusCodes.NOT_IMPLEMENTED).json({ ok: true });
  } catch (error) {
    return next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(HttpStatusCodes.NOT_IMPLEMENTED).json({ ok: true });
  } catch (error) {
    return next(error);
  }
};

export const updateUserUsername = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(HttpStatusCodes.NOT_IMPLEMENTED).json({ ok: true });
  } catch (error) {
    return next(error);
  }
};

export const updateUserPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(HttpStatusCodes.NOT_IMPLEMENTED).json({ ok: true });
  } catch (error) {
    return next(error);
  }
};

export const updateUserPicture = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(HttpStatusCodes.NOT_IMPLEMENTED).json({ ok: true });
  } catch (error) {
    return next(error);
  }
};
