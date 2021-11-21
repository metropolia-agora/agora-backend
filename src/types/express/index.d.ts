import { User, AnonymousUser } from '../../entities';

// Override the type definitions of the express library from @types/express
// to include a user field in the request data. This field will be provided
// on each request by our authentication middleware.
declare global {
  namespace Express {
    interface Request {
      user: User | AnonymousUser;
    }
  }
}
