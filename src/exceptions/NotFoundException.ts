import HttpStatusCodes from 'http-status-codes';
import { HttpException } from './HttpException';

// HTTP 404 exception used when the client requests a resource that cannot be found.
export class NotFoundException extends HttpException {
  constructor(message?: string, details?: unknown) {
    super(HttpStatusCodes.NOT_FOUND, message || 'The requested resource was not found.', details);
  }
}
