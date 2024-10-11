import { connectToMongoDB } from './db.js';

const startServer = async () => {
  await connectToMongoDB();
};

startServer();