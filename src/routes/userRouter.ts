import { Router } from 'express';
import { body, FileTypes, fileUpload, param, validator } from '../middlewares';
import { userControllers } from '../controllers';

// Router to handle requests to /api/users
const userRouter = Router();

// Authenticate a user
userRouter.post(
  '/auth',
  validator([
    body('username').isString(),
    body('password').isString(),
  ]),
  userControllers.authenticateUser,
);

// Create a new user
userRouter.post(
  '/',
  validator([
    body('username').isString(),
    body('password').isString(),
  ]),
  userControllers.createUser,
);

// Get a user
userRouter.get(
  '/:userId',
  validator([
    param('userId').isUUID(4),
  ]),
  userControllers.getUser,
);

// Delete a user
userRouter.delete(
  '/:userId',
  validator([
    param('userId').isUUID(4),
    body('password').isString(),
  ]),
  userControllers.deleteUser,
);

// Update a user's username
userRouter.post(
  '/:userId/username',
  validator([
    param('userId').isUUID(4),
    body('username').isString(),
  ]),
  userControllers.updateUserUsername,
);

// Update a user's password
userRouter.post(
  '/:userId/password',
  validator([
    param('userId').isUUID(4),
    body('newPassword').isString(),
    body('currentPassword').isString(),
  ]),
  userControllers.updateUserPassword,
);

// Update a user's profile picture
userRouter.post(
  '/:userId/picture',
  fileUpload([FileTypes.image]).single('file'),
  userControllers.updateUserPicture,
);

export { userRouter };
