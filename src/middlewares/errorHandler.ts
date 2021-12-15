import { Request, Response, NextFunction } from 'express';
import HttpStatusCodes from 'http-status-codes';
import { HttpException } from '../exceptions';
import { promises as fs } from 'fs';

// Express middleware to handle errors passed down the middleware chain through
// the `next()` function. The errors are intentionally thrown `HttpException`-s or
// unexpectedly happening `Error`-s that cause the server to fail.
export const errorHandler = async (error: unknown, req: Request, res: Response, _next: NextFunction) => {
  // Get the status code of the error or use HTTP 500 internal server error by default
  const status = error instanceof HttpException
    ? error.status
    : HttpStatusCodes.INTERNAL_SERVER_ERROR;

  // Get the message of the error or use a default message
  const message = error instanceof HttpException
    ? error.message
    : 'An unexpected error has occured. Please try again.';

  // Get the details of the error if it exists
  const details = error instanceof HttpException && !!error.details
    ? { details: error.details }
    : {};

  // Internal server errors are unexpected and should be logged
  if (status === HttpStatusCodes.INTERNAL_SERVER_ERROR) console.error(error);

  // Remove uploaded file if the request eventually failed
  if (req.file) {
    await fs.rm(`uploads/${req.file.filename}`, { force: true });
  }

  // Send error response to the client
  res.status(status).json({ status, message, ...details });
};
