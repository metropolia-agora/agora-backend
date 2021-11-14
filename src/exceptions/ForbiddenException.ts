import HttpStatusCodes from 'http-status-codes';
import { HttpException } from './HttpException';

// HTTP 403 exception used when the client requests to perform an
// action or access a resource that they do not have permission to.
export class ForbiddenException extends HttpException {
  constructor(message?: string, details?: unknown) {
    super(HttpStatusCodes.FORBIDDEN, message || 'The requested action was forbidden.', details);
  }
}
