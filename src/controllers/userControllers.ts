import { Request, Response, NextFunction } from 'express';
import HttpStatusCodes from 'http-status-codes';

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(HttpStatusCodes.NOT_IMPLEMENTED).json({ ok: true });
  } catch (error) {
    return next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.status(HttpStatusCodes.NOT_IMPLEMENTED).json({ ok: true });
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
