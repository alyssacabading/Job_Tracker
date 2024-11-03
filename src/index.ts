import express, { Application } from 'express';
import { connectToMongoDB } from './db.js';
import dotenv from 'dotenv';
import jobRoutes from './routes/jobRoutes.js';
import userRoutes from './routes/userRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import skillRoutes from './routes/skillRoutes.js';

dotenv.config();
const app: Application = express();
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes); 
app.use('/api/contacts', contactRoutes);
app.use('/api/skills', skillRoutes);

const startServer = async () => {
  await connectToMongoDB(); // Connect to MongoDB

  const PORT = process.env.PORT || 5000;   // import PORT from .env file, or 5000
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
