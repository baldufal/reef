import { MongoClient, Db } from 'mongodb';
import { config } from '../../../config';

// Create a global MongoDB client instance
let client: MongoClient;

export const connectToDatabase = async (): Promise<Db> => {
  // We try to read the mongo uri (including login) from the environment variable
  // This will be defined when the backend is deployed via docker
  // Otherwise we use the fallback config so that we can also run reef easily without docker
  const uri = process.env.MONGO_URI || config.fallback_mongo_url;
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  return client.db();
};
