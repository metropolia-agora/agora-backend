import { Request, Response, NextFunction } from 'express';
import HttpStatusCodes from 'http-status-codes';
import path from 'path';
import { promises as fs } from 'fs';

class FileControllers {

  async getFile(req: Request, res: Response, next: NextFunction) {
    const { filename } = req.params;
    try {
      const root = path.join(__dirname, '../../uploads');
      await fs.stat(path.join(root, filename));
      return res.status(HttpStatusCodes.OK).sendFile(filename, { root });
    } catch (error) {
      if (error.code === 'ENOENT') return res.sendStatus(HttpStatusCodes.NOT_FOUND);
      return next(error);
    }
  }

}

export const fileControllers = new FileControllers();
