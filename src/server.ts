import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';

// Create express app
const app = express();

// Get port from env or use default 5000
const port = process.env.PORT || 5000;

// Set up JSON body parsing
app.use(express.json());

// Enable CORS and pre-flight checks for all routes
app.use(cors());
app.options('*', cors());

// Health check endpoint
app.get('/', (req: Request, res: Response) => {
  res.status(200).send('API is running.');
});

// Start listening to incoming requests
const server = app.listen(port, () => console.log(`Server listening on port ${port}.`));

// Handle shutdown
process.on('SIGINT', () => {
  server.close(() => {
    console.log('Server shutting down.');
    process.exit(0);
  });
});
