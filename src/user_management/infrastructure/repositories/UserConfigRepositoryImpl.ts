import { UserConfigRepository } from '../../domain/repositories/UserConfigRepository';
import { UserConfig } from '../../domain/entities/UserConfig';
import { connectToDatabase } from '../services/mongodb'; // Import MongoDB connection
import { userManagementLogger } from '../../../logging';
import { Collection, Document } from 'mongodb';

interface UserConfigDoc extends Document {
  username: string;
  dashboard: string[];
}

export class UserConfigRepositoryImpl implements UserConfigRepository {
  //private db: Db | undefined;
  private userConfigCollection: Collection<UserConfigDoc> | undefined;

  constructor() {
    connectToDatabase()
      .then((db) => {
        //this.db = db;
        this.userConfigCollection = db.collection('user_configs');
        userManagementLogger.info('Connected to MongoDB for user config repository');
      })
  }

  async getConfig(username: string): Promise<UserConfig> {
    if (!this.userConfigCollection) {
      throw new Error('Database not connected');
    }

    const userConfig = await this.userConfigCollection.findOne({ username });
    if (userConfig) {
      return new UserConfig(userConfig.dashboard);
    } else {
      userManagementLogger.info(`No config found for user ${username}, creating default`);
      return UserConfig.createDefault();
    }
  }

  async saveConfig(username: string, config: UserConfig): Promise<void> {
    if (!this.userConfigCollection) {
      throw new Error('Database not connected');
    }

    const existingConfig = await this.userConfigCollection.findOne({ username });
    if (existingConfig) {
      await this.userConfigCollection.updateOne(
        { username },
        { $set: { dashboard: config.dashboard } }
      );
    } else {
      await this.userConfigCollection.insertOne({
        username,
        dashboard: config.dashboard,
      });
    }
  }
}
