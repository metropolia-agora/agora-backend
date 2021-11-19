import HttpStatusCodes from 'http-status-codes';
import { HttpException } from './HttpException';

// HTTP 401 exception used when the client tries to call an endpoint
// that requires authorization without providing credentials.
export class UnauthorizedException extends HttpException {
  constructor(message?: string, details?: unknown) {
    super(HttpStatusCodes.UNAUTHORIZED, message || 'The request requires authorization.', details);
  }
}
