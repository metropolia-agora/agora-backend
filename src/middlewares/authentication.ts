import { NextFunction, Request, Response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { UserService } from '../services';
import { UnauthorizedException } from '../exceptions';
import { env } from '../utils';
import { AnonymousUser } from '../entities';

// Express middleware to authenticate incoming requests, deny access to users with invalid tokens,
// and set the `req.user` property to either an existing or an anonymous user.
export const authentication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get the token from the `authorization` request header
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      // Continue as an anonymous user if the header is not present
      req.user = new AnonymousUser();
      return next();
    } else {
      // Validate the token to be of the expected `Bearer jwt_token` format
      const token = authorizationHeader.split('Bearer ')[1];
      if (!token) {
        return next(new UnauthorizedException('Authorization token format invalid.'));
      } else {
        // Verify that the token has been signed with by this server's own secret
        const secret = env.getJwtSecret();
        jsonwebtoken.verify(token, secret, async (error, decoded) => {
          if (error || !decoded) {
            return next(new UnauthorizedException('Authorization token invalid.'));
          } else {
            // Verify that the token belongs to an existing user
            try {
              // Continue as an authenticated user
              req.user = await UserService.findUserById(decoded.userId);
              return next();
            } catch (error) {
              return next(new UnauthorizedException('Authorization token invalid.'));
            }
          }
        });
      }
    }
  } catch (error) {
    return next(error);
  }
};
