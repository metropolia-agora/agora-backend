import express, { Request, Response } from 'express';
import cors from 'cors';
import { userRouter } from './routes';
import { errorHandler } from './middlewares';
import { env } from './utils';

// Create express app
const app = express();

// Get port from env
const port = env.getPort();

// Set up JSON body parsing
app.use(express.json());

// Enable CORS and pre-flight checks for all routes
app.use(cors());
app.options('*', cors());

// Health check endpoint
app.get('/api', (req: Request, res: Response) => {
  res.status(200).send('API is running.');
});

// Attach api routers
app.use('/api/users', userRouter);

// Attach error handler
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
