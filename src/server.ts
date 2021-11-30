import express, { Request, Response } from 'express';
import cors from 'cors';
import HttpStatusCodes from 'http-status-codes';
import { authentication, errorHandler } from './middlewares';
import { fileRouter, postRouter, userRouter } from './routes';

// Create express app
const app = express();

// Get port from env
const port = 5000;

// Set up JSON body parsing
app.use(express.json());

// Enable CORS and pre-flight checks for all routes
app.use(cors());
app.options('*', cors());

// Health check endpoint
app.get('/api', (req: Request, res: Response) => {
  res.status(HttpStatusCodes.OK).send('API is running!');
});

// Attach authentication middleware
app.use(authentication);

// Attach api routers
app.use('/api/files', fileRouter);
app.use('/api/posts', postRouter);
app.use('/api/users', userRouter);

// Attach error handler middleware
app.use(errorHandler);

// Start listening to incoming requests
const server = app.listen(port, () => console.log(`Server listening on port ${port}.`));

// Handle shutdown
process.on('SIGINT', () => {
  server.close(() => {
    console.log('Server shutting down.');
    process.exit(0);
  });
});
