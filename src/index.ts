import express, { Application } from 'express';
import { connectToMongoDB } from './db.js';
import dotenv from 'dotenv';
import jobRoutes from './routes/jobRoutes.js';
import userRoutes from './routes/userRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { authMiddleware } from './middlewares/authMiddleware.js';

dotenv.config();
const app: Application = express();
app.use(express.json());

// Routes (routes with authMiddleware require authentication)
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/jobs', authMiddleware, jobRoutes); 
app.use('/api/contacts', authMiddleware, contactRoutes);
app.use('/api/auth', authRoutes);

const startServer = async () => {
  await connectToMongoDB(); // Connect to MongoDB

  const PORT = process.env.PORT || 5000;   // import PORT from .env file, or 5000
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();