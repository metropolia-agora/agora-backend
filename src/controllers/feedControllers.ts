import { Request, Response, NextFunction } from 'express';
import HttpStatusCodes from 'http-status-codes';

class FeedControllers {

  async getRecent(req: Request, res: Response, next: NextFunction) {

  }
}

export const feedControllers = new FeedControllers();