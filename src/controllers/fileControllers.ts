import { Request, Response, NextFunction } from 'express';
import HttpStatusCodes from 'http-status-codes';
import path from 'path';

class FileControllers {

  async getFile(req: Request, res: Response, next: NextFunction) {
    const { filename } = req.params;
    try {
      return res.status(HttpStatusCodes.OK).sendFile(filename, { root: path.join(__dirname, '../../uploads') });
    } catch (error) {
      return next(error);
    }
  }

}

export const fileControllers = new FileControllers();
