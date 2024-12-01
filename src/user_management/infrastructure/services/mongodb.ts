import { MongoClient, Db } from 'mongodb';

// Create a global MongoDB client instance
let client: MongoClient;

export const connectToDatabase = async (): Promise<Db> => {
  const uri = process.env.MONGO_URI || 'mongodb://admin:securepassword123@localhost:27017/user_management?authSource=admin';
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client.db();
};
