import { UserRepository } from '../../domain/repositories/UserRepository';
import { User, Permission, defaultUsers, UserUpdate } from '../../domain/entities/User';
import { connectToDatabase } from './../services/mongodb'; // Import MongoDB connection
import { userManagementLogger } from '../../../logging';
import { Collection, Document } from 'mongodb';
import bcrypt from 'bcryptjs';
import { UserConfig } from '../../domain/entities/UserConfig';

interface UserDoc extends Document {
  username: string;
  password_hash: string;
  permissions: Permission[];
  config: UserConfig;
}

export class UserRepositoryImpl implements UserRepository {
  private usersCollection: Collection<UserDoc> | undefined;

  constructor() {
    connectToDatabase()
      .then((db) => {
        this.usersCollection = db.collection('users');
        userManagementLogger.info('Connected to MongoDB for user repository');

        // Create unique index on username field
        this.usersCollection.createIndex({ username: 1 }, { unique: true })
          .then(() => userManagementLogger.info('Unique index on username created.'))
          .catch((error) => userManagementLogger.error('Error creating unique index on username:', error));

        this.initializeDefaultUsers();
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
    if (!this.usersCollection)
      throw new Error('Database not connected');
    for (const user of defaultUsers)
      if ( await this.usersCollection.findOne({ username: user.username }) === null) {
        userManagementLogger.info(`Default user ${user.username} not found. Creating...`);
        this.saveNewUser(user);
      }
  }

  async findAll(): Promise<User[]> {
    if (!this.usersCollection) {
      userManagementLogger.error('Cannot retrieve users. Database not connected.');
      return [];
    }

    const userDocs = await this.usersCollection.find().toArray();
    return userDocs.map(userDoc => this.userFromDoc(userDoc));
  }

  async findByUsername(username: string): Promise<User | null> {
    if (!this.usersCollection) {
      userManagementLogger.error('Cannot search user. Database not connected.');
      return null;
    }

    const userDoc = await this.usersCollection.findOne({ username });
    if (userDoc) {
      return this.userFromDoc(userDoc);
    }
    userManagementLogger.info("User not found");
    return null;
  }

  async saveNewUser(user: User): Promise<string | null> {
    if (!this.usersCollection) {
      userManagementLogger.error('Cannot save user. Database not connected.');
      return 'Database not connected';
    }

    try {
      await this.usersCollection.insertOne({
        username: user.username,
        password_hash: user.password_hash,
        permissions: user.permissions,
        config: user.config,
      });
      userManagementLogger.info(`New user with username ${user.username} saved successfully.`);
      return null;
    } catch (error) {
      if ((error as any)?.code && (error as any).code === 11000) {
        userManagementLogger.info(`Username '${user.username}' already exists.`, error);
        return `Username '${user.username}' already exists.`;
      } else {
        userManagementLogger.error('Error saving new user:', error);
        return 'Error saving new user';
      }
    }
  }

  async updateUser(user: UserUpdate): Promise<void> {
    if (!this.usersCollection) {
      userManagementLogger.error('Cannot update user. Database not connected.');
      return;
    }

    const updateFields: any = {};
    if (user.password) {
      updateFields.password_hash = bcrypt.hashSync(user.password);
    }
    if (user.permissions) {
      updateFields.permissions = user.permissions;
    }
    if (user.config) {
      updateFields.config = user.config;
    }

    try {
      await this.usersCollection.updateOne(
        { username: user.username },
        { $set: updateFields }
      );
      userManagementLogger.info(`User with username ${user.username} updated successfully.`);
    } catch (error) {
      userManagementLogger.error('Error updating user:', error);
    }
  }

  private userFromDoc(userDoc: UserDoc): User {
    return new User(
      userDoc.username,
      userDoc.password_hash,
      userDoc.permissions,
      userDoc.config,
    );
  }
}


