import { Router } from 'express';
import { param, validator } from '../middlewares';
import { fileControllers } from '../controllers';

// Router to handle requests to /api/files
const fileRouter = Router();

// Get a file by filename
fileRouter.get(
  '/:filename',
  validator([
    param('filename').isString(),
  ]),
  fileControllers.getFile,
);

export { fileRouter };
