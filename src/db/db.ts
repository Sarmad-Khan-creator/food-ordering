import mongoose from 'mongoose';

let isConnected = false;

export const connectToDatabase = async () => {
  const MONGODB_URL = process.env.MONGODB_URL;

  if (!MONGODB_URL) {
    console.error('No MongoDB URL provided');
    return;
  }

  if (isConnected) {
    console.log('Already connected to MongoDB!');
    return;
  }

  if (!isConnected) {
    try {
      await mongoose.connect(MONGODB_URL!, {
        dbName: 'Foods-Ordering-Database',
      });

      mongoose.set('strictQuery', true);

      isConnected = true;
      console.log('Connected');
    } catch (error) {
      console.log('Error while connecting to database', error);
    }
  }

  return;
};
