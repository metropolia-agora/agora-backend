import HttpStatusCodes from 'http-status-codes';
import { HttpException } from './HttpException';

// HTTP 500 exception used when the server runs into an unexpected
// error and is unable to perform the requested action. This usually
// means and issue with the server's code and not the user's request.
export class InternalServerException extends HttpException {
  constructor(message?: string, details?: unknown) {
    super(HttpStatusCodes.INTERNAL_SERVER_ERROR, message || 'An unexpected error has occured.', details);
  }
}
