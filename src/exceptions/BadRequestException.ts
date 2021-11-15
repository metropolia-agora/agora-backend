import HttpStatusCodes from 'http-status-codes';
import { HttpException } from './HttpException';

// HTTP 400 exception used when the client provides invalid,
// insufficient, or malformatted data in their request.
export class BadRequestException extends HttpException {
  constructor(message?: string, details?: unknown) {
    super(HttpStatusCodes.BAD_REQUEST, message || 'The request parameters were invalid.', details);
  }
}
