import { connectToMongoDB } from './db.js';
import express, { Application } from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';


dotenv.config();
const app: Application = express();
app.use(express.json());

app.use('/api/users', userRoutes);

const startServer = async () => {
  await connectToMongoDB(); // Connect to MongoDB

  const PORT = process.env.PORT || 5000;   // import PORT from .env file, or 5000
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();