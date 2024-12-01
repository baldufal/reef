import { UserRepository } from '../../domain/repositories/UserRepository';
import { User, Permission, defaultUsers } from '../../domain/entities/User';
import { connectToDatabase } from './../services/mongodb'; // Import MongoDB connection
import { userManagementLogger } from '../../../logging';
import { Collection, Db, Document } from 'mongodb';

interface UserDoc extends Document {
  username: string;
  password_hash: string;
  permissions: Permission[];
}

export class UserRepositoryImpl implements UserRepository {
  private usersCollection: Collection<UserDoc> | undefined;

  constructor() {
    connectToDatabase()
      .then((db) => {
        this.usersCollection = db.collection('users');
        userManagementLogger.info('Connected to MongoDB for user repository');
        this.initializeDefaultUsers(); // Initialize default users
      })
      .catch((error) => {
        userManagementLogger.error('Error connecting to MongoDB:', error);
      });
  }

  private async initializeDefaultUsers(): Promise<void> {
    if (!this.usersCollection) {
      throw new Error('Database not connected');
    }

    for (const user of defaultUsers) {
      const existingUser = await this.usersCollection.findOne({ username: user.username });
      if (!existingUser) {
        await this.usersCollection.insertOne({
          username: user.username,
          password_hash: user.password_hash,
          permissions: user.permissions,
        });
        userManagementLogger.info(`Default user '${user.username}' added.`);
      } else {
        userManagementLogger.info(`Default user '${user.username}' already exists.`);
      }
    }
  }

  async findAll(): Promise<User[]> {
    if (!this.usersCollection) {
      throw new Error('Database not connected');
    }

    const userDocs = await this.usersCollection.find().toArray();
    return userDocs.map(userDoc => new User(
      userDoc.username,
      userDoc.password_hash,
      userDoc.permissions
    ));
  }

  async findByUsername(username: string): Promise<User | null> {
    if (!this.usersCollection) {
      throw new Error('Database not connected');
    }

    const userDoc = await this.usersCollection.findOne({ username });
    if (userDoc) {
      return new User(userDoc.username, userDoc.password_hash, userDoc.permissions);
    }
    return null;
  }

  // Saves or updates user with the given username
  async save(user: User): Promise<void> {
    if (!this.usersCollection) {
      throw new Error('Database not connected');
    }

    const existingUser = await this.usersCollection.findOne({ username: user.username });
    if (existingUser) {
      await this.usersCollection.updateOne(
        { username: user.username },
        {
          $set: {
            password_hash: user.password_hash,
            permissions: user.permissions,
          },
        }
      );
    } else {
      await this.usersCollection.insertOne({
        username: user.username,
        password_hash: user.password_hash,
        permissions: user.permissions,
      });
    }
  }
}
