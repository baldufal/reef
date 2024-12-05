import { UserRepository } from '../../domain/repositories/UserRepository';
import { User, Permission, defaultUsers, UserUpdate } from '../../domain/entities/User';
import { connectToDatabase } from './../services/mongodb'; // Import MongoDB connection
import { userManagementLogger } from '../../../logging';
import { Collection, Document } from 'mongodb';
import bcrypt from 'bcryptjs';

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

  async delete(username: string): Promise<void> {
    if (!this.usersCollection) {
      userManagementLogger.error('Cannot delete user. Database not connected.');
      return;
    }

    try {
      const result = await this.usersCollection.deleteOne({ username });
      if (result.deletedCount === 0) {
        userManagementLogger.info(`User with username ${username} not found.`);
      } else {
        userManagementLogger.info(`User with username ${username} deleted successfully.`);
      }
    } catch (error) {
      userManagementLogger.error('Error deleting user:', error);
    }
  }

  private async initializeDefaultUsers(): Promise<void> {
    if (!this.usersCollection) {
      throw new Error('Database not connected');
    }

    for (const user of defaultUsers) {
      this.save(user);
    }
  }

  async findAll(): Promise<User[]> {
    if (!this.usersCollection) {
      userManagementLogger.error('Cannot retrieve users. Database not connected.');
      return [];
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
      userManagementLogger.error('Cannot search user. Database not connected.');
      return null;
    }

    const userDoc = await this.usersCollection.findOne({ username });
    if (userDoc) {
      return new User(userDoc.username, userDoc.password_hash, userDoc.permissions);
    }
    userManagementLogger.info("User not found");
    return null;
  }

  // Saves or updates user with the given username
  async save(user: UserUpdate): Promise<void> {
    if (!this.usersCollection) {
      userManagementLogger.error('Cannot save user. Database not connected.');
      return;
    }

    const existingUser = await this.usersCollection.findOne({ username: user.username });
    const updateFields: any = {};

    if (user.password) {
      updateFields.password_hash = bcrypt.hashSync(user.password);
    }
    if (user.permissions) {
      updateFields.permissions = user.permissions;
    }

    if (existingUser) {
      userManagementLogger.info(`Updating user with username ${user.username}`);
      await this.usersCollection.updateOne(
        { username: user.username },
        { $set: updateFields }
      );
    } else {
      userManagementLogger.info(`Creating user with username ${user.username}`);
      await this.usersCollection.insertOne({
        username: user.username,
        ...updateFields,
      });
    }
  }
}
