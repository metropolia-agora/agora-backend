import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import HttpStatusCodes from 'http-status-codes';
import { authentication, errorHandler } from './middlewares';
import { feedRouter, fileRouter, postRouter, userRouter } from './routes';
import { env } from './utils';

// Create express app
const app = express();

// Get port from env
const port = 5000;

// Set up JSON body parsing
app.use(express.json());

// Enable helmet
app.use(helmet());

// Enable CORS and pre-flight checks for all routes
const origin = env.getFrontendUrl();
app.use(cors({ origin }));
app.options('*', cors({ origin }));

// Disable http caching
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

// Health check endpoint
app.get('/api', (req: Request, res: Response) => {
  res.status(HttpStatusCodes.OK).send('API is running!');
});

// Attach authentication middleware
app.use(authentication);

// Attach api routers
app.use('/api/feed', feedRouter);
app.use('/api/files', fileRouter);
app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);

// Attach error handler middleware
app.use(errorHandler);

// Start listening to incoming requests
app.listen(port, () => console.log(`Server listening on port ${port}.`));
