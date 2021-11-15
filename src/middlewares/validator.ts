import { Request, Response, NextFunction } from 'express';
import { ValidationChain, validationResult, body, param, query } from 'express-validator';
import { BadRequestException } from '../exceptions';

// Express middleware to validate the body, param and query fields of an incoming request
// before calling the controllers. If any of the passed validators fails a `BadRequestException`
// will be passed down the middleware chain through the `next()` function.
export const validator = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Run all validations
    await Promise.all(validations.map(validation => validation.run(req)));
    // Check for possible errors
    const errors = validationResult(req);
    // Pass an error down the middleware chain if any of the validations fail
    if (!errors.isEmpty()) {
      return next(new BadRequestException('The request parameters were invalid.', errors.array()));
    } else {
      return next();
    }
  };
};

export { body, param, query };
